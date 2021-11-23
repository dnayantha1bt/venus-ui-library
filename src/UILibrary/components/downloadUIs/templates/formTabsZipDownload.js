import React, { useState, useEffect, Suspense } from 'react';
import { getFormValues, initialize } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Tabs } from 'antd';

import constants from '../../../constants';
import ExcelWorkbook from '../../../helpers/ExcelWorkbook';
import { readFile } from '../../forms/fields/FileDownloader';
import FormGenerator from '../../forms/formBase';
import FormHeaderComponent from '../../forms/formHeader';
import TabChange from '../../tabChangeComponent';
import FormSectionBase from '../../forms/formBase/FormSectionBase';
import hooks from '../hooks';

const {
    GENERATE_FORMS_TYPE_WITH_CHILDREN,
    GENERATE_FORM_SECTION_TYPE_SIMPLE,
    FORM_SECTION_INCLUDE_COMPONENT,
    BUTTON_TITLE_DOWNLOAD,
    BUTTON_TITLE_REQUEST,
    FORM_SECTION_INCLUDE_NEW,
    FORM_ACTION_TYPES,
    STEP_ACTION_PROCEED
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

let TabFormDataDownload = props => {
    const {
        formTabs,
        formName,
        formHooks,
        options: {
            title = null,
            titleIicon = null,
            downloadButton = true,
            submitButton = true,
            labelOverRide = null,
            zipName = 'scheme',
            attachmentArray = []
        },
        dataset,
        disabled = true,
        action_inProgress,
        submitAction = STEP_ACTION_PROCEED,
        handleFormSubmit
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [downloadInProgress, setDownloadInProgress] = useState(false);
    const [activeTabKey, changeActiveTaKey] = useState(null);

    useEffect(() => {
        if (dataset && dataset.formData) {
            dispatch(initialize(formName, dataset.formData));
        }
    }, [dataset]);

    useEffect(() => {
        if (formTabs.length && !activeTabKey) {
            onchangeTab(formTabs[0].tabKey);
        }
    }, [formTabs]);

    const onchangeTab = key => {
        changeActiveTaKey(key);
    };

    const handleDownload = async params => {
        setDownloadInProgress(true);

        try {
            const attachments = [];

            const sheets = formTabs.map((tab) => {
                const tabKey = tab.tabKey;

                const sheetData = [];

                const _values = tab.formFieldData
                    ? tab.formFieldData
                    : tab.formFieldFunction
                    ? tab.formFieldFunction({ ...dirtyFormValues, ...props })
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
                    const data = dirtyFormValues[tabKey][name] || '';

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
                    columns: [
                        { label: 'Question', value: 'key' },
                        { label: 'Answer', value: 'value' }
                    ]
                };
            });

            const sheetDatam = new ExcelWorkbook().getExcelData(sheets);

            const fileDataMap = [];

            for (let attachment of attachments) {
                const fileSource = await readFile({ url: attachment.url });
                fileDataMap.push({ name: attachment.key, source: fileSource });
            }

            const zip = new JSZip();
            zip.file(`${zipName.split(' ').join('-')}details.xlsx`, sheetDatam);
            if (fileDataMap && fileDataMap.length > 0) {
                for (let file of fileDataMap) {
                    zip.file(file.name, file.source);
                }
            }

            zip.generateAsync({ type: 'blob' }).then(function (content) {
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

export default TabFormDataDownload;
