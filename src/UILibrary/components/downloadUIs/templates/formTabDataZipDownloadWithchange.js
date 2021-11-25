import React, { useState, useEffect, Suspense } from 'react';
import { getFormValues, submit, initialize, getFormSyncErrors } from 'redux-form';
import { compose } from 'redux';
import { useDispatch, useSelector, connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Tabs } from 'antd';
import config from 'appConfig';

import constants from '../../../constants';
import ExcelWorkbook from '../../../helpers/ExcelWorkbook';
import { readFile } from '../../forms/fields/FileDownloader';
import FormGenerator from '../../forms/formBase';
import FormHeaderComponent from '../../forms/formHeader';
import NotificationHelper from '../../../helpers/NotificationHelper';
import { removeInvalidData } from '../../forms/validations/dataFormatter';
import TabChange from '../../tabChangeComponent';
import FormSectionBase from '../../forms/formBase/FormSectionBase';

const {
    GENERATE_FORMS_TYPE_WITH_CHILDREN,
    GENERATE_FORM_SECTION_TYPE_SIMPLE,
    FORM_SECTION_INCLUDE_COMPONENT,
    BUTTON_TITLE_DOWNLOAD,
    FORM_SECTION_INCLUDE_NEW,
    BUTTON_TITLE_REQUEST,
    SUBMIT_ACTION,
    ON_SUBMIT_MESSAGE,
    DATA_SAVE_ACTION,
    FORM_ACTION_TYPES
} = constants;
const { bucket: privateBucketName, publicBucket: publicBucketName } = config;

const isArrayOrNot = data => {
    try {
        const convertedData = JSON.parse(data);
        if (Array.isArray(convertedData)) return true;
        return false;
    } catch (error) {
        return false;
    }
};

let FormTabDataChangeAndDownload = props => {
    const {
        submitSimpleForm,
        formTabs,
        formName,
        formHooks,
        formFieldData,
        formFieldFunction,
        options: {
            submitButton = true,
            title = null,
            titleIicon = null,
            downloadButton = true,
            labelOverRide = null,
            onSubmitMessage = ON_SUBMIT_MESSAGE,
            zipName = 'scheme',
            attachmentArray = []
        },
        action_inProgress,
        dataset,
        disabled = true,
        submitAction = SUBMIT_ACTION,
        asyncErrors,
        handleFormSubmit,
        downloadOptions: {
            api,
            isPublicBucket = false
        }
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [downloadInProgress, setDownloadInProgress] = useState(false);
    const [activeTabKey, changeActiveTaKey] = useState(null);
    const [submissionType, setSubmissionType] = useState(null);

    useEffect(() => {
        if (dataset.formData) {
            dispatch(initialize(formName, dataset.formData));
        }
    }, [dataset.formData]);

    useEffect(() => {
        if (submissionType === submitAction) {
            submitSimpleForm(formName);
        }
    }, [submissionType]);

    useEffect(() => {
        if (formTabs.length && !activeTabKey) {
            onchangeTab(formTabs[0].tabKey);
        }
    }, [formTabs]);

    const onchangeTab = key => {
        changeActiveTaKey(key);
    };
    const handleSubmit = type => {
        setSubmissionType(type);
    };

    const handleDownload = async params => {
        setDownloadInProgress(true);

        try {
            const attachments = [];

            const sheets = formTabs.map(tab => {
                const tabKey = tab.tabKey;

                console.log('TABKEY', tabKey);

                const sheetData = [];

                const values = tab.formFieldData
                    ? tab.formFieldData
                    : tab.formFieldFunction
                    ? tab.formFieldFunction({ ...dirtyFormValues, ...props })
                    : null;

                const orderedFormData = _.orderBy(values, ['field.__order'], ['asc']);

                for (let obj of orderedFormData) {
                    const field = obj.field;
                    const name = field.name;
                    const label = labelOverRide && labelOverRide[name] ? labelOverRide[name] : obj.label;
                    const data = dirtyFormValues[tabKey][name] || '';

                    console.log('DATA', data);

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
                            attachments.push({
                                key: `${label.split(' ').join('-')}-` + data.split('/').pop(),
                                url: data
                            });
                        }
                    } else {
                        sheetData.push({
                            key: label,
                            value: moment(data).isValid() && isNaN(data) ? moment(data).format('DD-MM-YYYY') : data
                        });
                    }
                }

                return {
                    name: tab.tabName,
                    data: sheetData,
                    columns: [{ label: 'Question', value: 'key' }, { label: 'Answer', value: 'value' }]
                };
            });

            const sheetDatam = new ExcelWorkbook().getExcelData(sheets);

            const fileDataMap = [];

            for (let attachment of attachments) {
                const fileSource = await readFile({ url: attachment.url, bucketNameProp: isPublicBucket ? publicBucketName : privateBucketName, api });
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
    const formSubmit = formData => {
        let data = removeInvalidData(formData, formFieldData, formFieldFunction);
        let message = onSubmitMessage;
        let errors = {};

        if (submissionType === submitAction) {
            message = onSubmitMessage;
            if (formHooks && formHooks.whenSubmitDataFormat) data = formHooks.whenSubmitDataFormat(data);
            if (formHooks && formHooks.whenSubmitValidation) errors = formHooks.whenSubmitValidation(data, asyncErrors);
        }

        if (submissionType === DATA_SAVE_ACTION) {
            if (formHooks && formHooks.whenSaveDataFormat) data = formHooks.whenSaveDataFormat(data);
            if (formHooks && formHooks.whenSaveValidation) errors = formHooks.whenSaveValidation(data, asyncErrors);
        }

        if (errors.message) {
            return NotificationHelper.getInstance().error(errors.message);
        }

        handleFormSubmit(
            submissionType,
            { formData: data },
            () => {
                handleSubmit(null);
            },
            message
        );
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
                          //    claimHelper.getPermission(getLoggedUserClaims_data, step, BUTTON_CLAIM_DOWNLOAD)
                      }
                  ]
                : []),
            ,
            ...(submitButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.SUBMIT,
                          title: submitButton.title || BUTTON_TITLE_REQUEST,
                          state: {
                              inProgress: action_inProgress
                          },
                          onClick: () => {
                              handleSubmit(submitAction);
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
                onSubmit={formSubmit}
                name={formName}
                formType={GENERATE_FORMS_TYPE_WITH_CHILDREN}
            >
                <TabChange activeTabKey={activeTabKey} formTabs={formTabs} onchangeTab={onchangeTab}>
                    <Tabs activeKey={activeTabKey} onChange={activeKey => onchangeTab(activeKey)}>
                        {formTabs.map(tab => (
                            <Tabs.TabPane tab={tab.tabName} key={tab.tabKey} forceRender={true}>
                                <div className="form-body">
                                    <Suspense>
                                        {tab.type === FORM_SECTION_INCLUDE_NEW ? (
                                            <FormSectionBase
                                                formSectionType={GENERATE_FORM_SECTION_TYPE_SIMPLE}
                                                formSectionName={tab.tabKey}
                                                formName={formName}
                                                disabled={disabled}
                                                formFieldData={
                                                    tab.formFieldData
                                                        ? tab.formFieldData
                                                        : tab.formFieldFunction
                                                        ? tab.formFieldFunction({ ...dirtyFormValues, ...props })
                                                        : null
                                                }
                                                formHooks={formHooks}
                                            />
                                        ) : tab.type === FORM_SECTION_INCLUDE_COMPONENT ? (
                                            tab.formSection
                                        ) : null}
                                    </Suspense>
                                </div>
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </TabChange>
            </FormGenerator>
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
)(FormTabDataChangeAndDownload);
