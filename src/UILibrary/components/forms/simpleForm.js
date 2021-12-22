import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { getFormValues, submit, initialize, getFormSyncErrors } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import _ from 'lodash';

import NotificationHelper from '../../helpers/NotificationHelper';
import FormGenerator from './formBase';
import FormHeaderComponent from './formHeader';
import ValidationModule from '../../validation-module';

import constants from '../../constants';

const {
    GENERATE_FORMS_TYPE_SIMPLE,
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST,
    ON_SUBMIT_MESSAGE,
    ON_SAVE_MESSAGE,
    DATA_SAVE_ACTION,
    SUBMIT_ACTION,
    FORM_ACTION_TYPES
} = constants;

let SimpleForm = props => {
    const {
        submitSimpleForm,
        formFieldData,
        formFieldFunction,
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

    useEffect(() => {
        if (submissionType === submitAction) {
            submitSimpleForm(formName);
            setSubmissionType(null);
        } else if (submissionType) {
            formSubmit(dirtyFormValues);
        }
    }, [submissionType]);

    useEffect(() => {
        if (dataset && dataset.formData) {
            dispatch(initialize(formName, dataset.formData));
        }
    }, [dataset]);

    const handleSubmit = type => {
        setSubmissionType(type);
    };

    const formSubmit = formData => {
        let data = ValidationModule.removeInvalidData(formData, formFieldData, formFieldFunction);
        let message = onSaveMessage;
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
                className="generate-iaa-manager-letters-form"
                onSubmit={formSubmit}
                name={formName}
                formFieldData={
                    formFieldData
                        ? formFieldData
                        : formFieldFunction
                        ? formFieldFunction({ ...dirtyFormValues, ...props })
                        : null
                }
                formType={GENERATE_FORMS_TYPE_SIMPLE}
                formHooks={formHooks}
                disabled={disabled}
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
)(SimpleForm);
