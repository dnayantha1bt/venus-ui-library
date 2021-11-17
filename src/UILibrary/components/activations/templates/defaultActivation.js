import React, { useState } from 'react';

import FormHeaderComponent from '../../forms/formHeader';
import constants from '../../../constants';

const {
    STEP_ACTION_ACTIVATE,
    BUTTON_TITLE_REQUEST,
    ON_SUBMIT_MESSAGE,
    STEP_UPDATE_TYPE_ACTIVE,
    FORM_ACTION_TYPES
} = constants;

let DefaultActivation = props => {
    const [submissionType, setSubmissionType] = useState(null);

    const {
        text,
        actionInProgress,
        handleFormSubmit,
        options: {
            title = null,
            titleIicon = null,
            submitButton = true,
        }
    } = props;

    const handleSubmit = action => {
        setSubmissionType(action);
        const updateType = STEP_UPDATE_TYPE_ACTIVE;
        handleFormSubmit(action, updateType);
        // updateWorkflowStepData(
        //     action,
        //     {},
        //     () => {
        //         setSubmissionType(null);
        //     },
        //     { message: onSubmitMessage, fetchEntityDataAfterSubmit, navigateAfterSubmit, fetchWorkflowAfterSubmit },
        //     updateType
        // );
    };

    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: [
            ...(submitButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.SUBMIT,
                          title: submitButton.title || BUTTON_TITLE_REQUEST,
                          state: {
                              inProgress: submissionType === STEP_ACTION_ACTIVATE && actionInProgress
                          },
                          onClick: () => {
                              handleSubmit(STEP_ACTION_ACTIVATE);
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
            <div className="root-form-wrapper">
                <div className="card card-wrapper">
                    <div className="root-form-wrapper">
                        <div className="card card-wrapper text-center">
                            <div className="alert info-alert w-50">
                                <i class="fa fa-info-circle icon"></i>
                                <span className="alert-message">{text}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DefaultActivation;
