import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { getFormValues, submit, initialize, getFormSyncErrors } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import config from 'appConfig';

import constants from '../../../constants';
import ExcelWorkbook from '../../../helpers/ExcelWorkbook';
import { readFile } from '../../forms/fields/FileDownloader';
import FormGenerator from '../../forms/formBase';
import FormHeaderComponent from '../../forms/formHeader';
import hooks from '../hooks';

const { bucket: privateBucketName, publicBucket: publicBucketName } = config;
const {
    GENERATE_FORMS_TYPE_SIMPLE,
    BUTTON_TITLE_DOWNLOAD,
    BUTTON_TITLE_REQUEST,
    SUBMIT_ACTION,
    FORM_ACTION_TYPES
} = constants;

const isArrayOrNot = data => {
    try {
        const convertedData = JSON.parse(data);
        if (Array.isArray(convertedData)) return true;
        return false;
    } catch (error) {
        return false;
    }
};

let SimpleFormDataDownload = props => {
    const {
        formFieldData,
        formFieldFunction,
        formName,
        formHooks,
        options: {
            title = null,
            titleIicon = null,
            downloadButton = true,
            submitButton = true,
            labelOverRide = null,
            zipName = 'scheme',
            excelTabNames = 'tab1',
            attachmentArray = []
        },
        action_inProgress,
        dataset,
        handleFormSubmit,
        submitAction = SUBMIT_ACTION,
        disabled = true,
        api
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [downloadInProgress, setDownloadInProgress] = useState(false);

    useEffect(() => {
        if (dataset && dataset.formData) {
            dispatch(initialize(formName, dataset.formData));
        }
    }, [dataset]);

    const handleDownload = async params => {
        setDownloadInProgress(true);

        try {
            const sheetData = [];
            const attachments = [];

            const _values = formFieldData
                ? formFieldData
                : formFieldFunction
                ? formFieldFunction({ ...dirtyFormValues, ...props })
                : null;

            let values = _values;

            for (let obj of values) {
                if (hooks[obj.field.component]) {
                    values = hooks[obj.field.component](values);
                }
            }

            const orderedFormData = _.orderBy(values, ['field.__order'], ['asc']);

            for (let obj of orderedFormData) {
                const field = obj.field;
                const name = field.name;
                const label = labelOverRide && labelOverRide[name] ? labelOverRide[name] : obj.label;
                const data = dirtyFormValues[name] || '';

                if ((name.includes('Attachment') || attachmentArray.includes(name)) && data && label) {
                    const isArray = isArrayOrNot(data);
                    if (isArray) {
                        const convertedData = JSON.parse(data);
                        for (let ds of convertedData) {
                            attachments.push({
                                key: `${label.split(' ').join('-')}-` + ds.url.split('/').pop(),
                                url: ds.url
                            });
                        }
                    } else {
                        attachments.push({ key: `${label.split(' ').join('-')}-` + data.split('/').pop(), url: data });
                    }
                } else {
                    sheetData.push({
                        key: label,
                        value: moment(data).isValid() && isNaN(data) ? moment(data).format('DD-MM-YYYY') : data
                    });
                }
            }
            const sheets = [
                {
                    name: excelTabNames,
                    data: sheetData,
                    columns: [{ label: 'Question', value: 'key' }, { label: 'Answer', value: 'value' }]
                }
            ];

            const sheetDatam = new ExcelWorkbook().getExcelData(sheets);
            const fileDataMap = [];

            for (let attachment of attachments) {
                const fileSource = await readFile({ url: attachment.url, bucketNameProp: privateBucketName, api });
                fileDataMap.push({ name: attachment.key, source: fileSource });
            }

            const zip = new JSZip();
            zip.file(`${zipName.split(' ').join('-')}details.xlsx`, sheetDatam);
            if (fileDataMap && fileDataMap.length > 0) {
                for (let file of fileDataMap) {
                    zip.file(file.name, file.source);
                }
            }

            zip.generateAsync({ type: 'blob' }).then(function(content) {
                saveAs(content, `${zipName.split(' ').join('-')}.zip`);
            });
            setDownloadInProgress(false);
        } catch (error) {
            setDownloadInProgress(false);
        }
    };

    const formSubmit = submissionType => {
        let message = null;

        handleFormSubmit(submissionType, { formData: dataset && dataset.formData }, () => {}, message);
    };

    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: [
            ...(downloadButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.DOWNLOAD,
                          title: downloadButton.title || BUTTON_TITLE_DOWNLOAD,
                          state: { inProgress: downloadInProgress },
                          onClick: () => {
                              handleDownload();
                          },
                          bool: downloadButton.showButton
                          //   claimHelper.getPermission(getLoggedUserClaims_data, step, BUTTON_CLAIM_DOWNLOAD)
                      }
                  ]
                : []),
            ...(submitButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.SUBMIT,
                          title: submitButton.title || BUTTON_TITLE_REQUEST,
                          state: {
                              inProgress: action_inProgress
                          },
                          onClick: () => {
                              formSubmit(submitAction);
                          },
                          bool: submitButton.showButton
                          //   !step.completed &&
                          //   !step.rejected &&
                          //   claimHelper.getPermission(getLoggedUserClaims_data, step, BUTTON_CLAIM_DOWNLOAD)
                      }
                  ]
                : [])
        ]
    };

    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />
            <FormGenerator
                className="generate-iaa-manager-letters-form"
                onSubmit={() => {}}
                name={formName}
                formFieldData={
                    formFieldData
                        ? formFieldData
                        : formFieldFunction
                        ? formFieldFunction({ ...dirtyFormValues, ...props })
                        : null
                }
                disabled={disabled}
                formType={GENERATE_FORMS_TYPE_SIMPLE}
                formHooks={formHooks}
            />
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    simpleFormData: getFormValues(ownProps.formName)(state),
    asyncErrors: getFormSyncErrors(ownProps.formName)(state)
});

const mapDispatchToProps = dispatch => ({
    submitSimpleForm: formName => {
        dispatch(submit(formName));
    }
});
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(SimpleFormDataDownload);
