import React, { useState, useEffect, Suspense, useRef } from 'react';
import { compose } from 'redux';
import { getFormValues, submit, initialize, getFormSyncErrors } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Tabs } from 'antd';
import _ from 'lodash';

import NotificationHelper from '../../helpers/NotificationHelper';
import TabChange from '../tabChangeComponent';
import FormGenerator from './formBase';
import FormSectionBase from './formBase/FormSectionBase';
import FormHeaderComponent from './formHeader';
import ValidationModule from '../../validation-module';

import constants from '../../constants';

const {
    GENERATE_FORMS_TYPE_WITH_CHILDREN,
    GENERATE_FORM_SECTION_TYPE_SIMPLE,
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST,
    ON_SUBMIT_MESSAGE,
    ON_SAVE_MESSAGE,
    FORM_SECTION_INCLUDE_NEW,
    FORM_SECTION_INCLUDE_COMPONENT,
    DATA_SAVE_ACTION,
    SUBMIT_ACTION,
    FORM_ACTION_TYPES
} = constants;

let FormWithTabs = props => {
    const {
        submitFormWithTabs,
        formTabs,
        formName,
        formHooks,
        disabled,
        options: {
            title = null,
            titleIicon = null,
            saveButton = true,
            submitButton = true,
            onSubmitMessage = ON_SUBMIT_MESSAGE,
            onSaveMessage = ON_SAVE_MESSAGE
        },
        action_inProgress,
        dataset,
        asyncErrors,
        submitAction = SUBMIT_ACTION,
        handleFormSubmit
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [submissionType, setSubmissionType] = useState(null);
    const [activeTabKey, changeActiveTaKey] = useState(null);

    const prevDataset = usePrevious(dataset);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    useEffect(() => {
        if (submissionType === submitAction) {
            submitFormWithTabs(formName);
            setSubmissionType(null);
        } else if (submissionType) {
            formSubmit(dirtyFormValues);
        }
    }, [submissionType]);

    useEffect(() => {
        if (dataset && dataset.formData) {
            if (!prevDataset || !_.isEqual(prevDataset.formData, dataset.formData))
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

    const handleSubmit = type => {
        if (type === submitAction && !_.isEmpty(asyncErrors)) {
            setSubmissionType(null);

            const formFieldTabs = formTabs.filter(tab => tab.formFieldData || tab.formFieldFunction);

            asyncError: for (const [key] of Object.entries(asyncErrors)) {
                for (const fieldTab of formFieldTabs) {
                    if (fieldTab.tabKey === key) {
                        onchangeTab(fieldTab.tabKey);
                        break asyncError;
                    }
                }
            }
        }
        setSubmissionType(type);
    };

    const formSubmit = formData => {
        let data = {};
        let message = onSaveMessage;
        let errors = {};

        for (const [key, value] of Object.entries(formData)) {
            const tabData = formTabs.find(a => a.tabKey === key);
            data[key] =
                tabData && ValidationModule.removeInvalidData(value, tabData.formFieldData, tabData.formFieldFunction);
        }

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
            ...(saveButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.SAVE,
                          title: saveButton.title || BUTTON_TITLE_SAVE,
                          state: {
                              inProgress: submissionType === DATA_SAVE_ACTION && action_inProgress
                          },
                          onClick: () => {
                              handleSubmit(DATA_SAVE_ACTION);
                          },
                          bool: saveButton.showButton
                      }
                  ]
                : []),
            ...(submitButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.SUBMIT,
                          title: submitButton.title || BUTTON_TITLE_REQUEST,
                          state: {
                              inProgress: submissionType === submitAction && action_inProgress
                          },
                          onClick: () => {
                              handleSubmit(submitAction);
                          },
                          bool: submitButton.showButton
                      }
                  ]
                : [])
        ]
    };

    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />
            <FormGenerator
                disabled={disabled}
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
                                                disabled={disabled}
                                                formSectionType={GENERATE_FORM_SECTION_TYPE_SIMPLE}
                                                formSectionName={tab.tabKey}
                                                formName={formName}
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
    formWithTabsData: getFormValues(ownProps.formName)(state),
    asyncErrors: getFormSyncErrors(ownProps.formName)(state)
});

const mapDispatchToProps = dispatch => ({
    submitFormWithTabs: formName => {
        dispatch(submit(formName));
    }
});
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(FormWithTabs);
