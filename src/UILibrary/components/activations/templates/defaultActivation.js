import React, { useState } from 'react';

import FormHeaderComponent from '../../forms/formHeader';
import constants from '../../../constants';

const { ACTIVE_MANDATE_ACTION, BUTTON_TITLE_REQUEST, FORM_ACTION_TYPES } = constants;

let DefaultActivation = props => {
    const [submissionType, setSubmissionType] = useState(null);

    const {
        text,
        action_inProgress,
        handleFormSubmit,
        options: { title = null, titleIicon = null, submitButton = true }
    } = props;

    const handleSubmit = action => {
        setSubmissionType(action);
        handleFormSubmit(
            action,
            {},
            () => {
                setSubmissionType(null);
            },
            message
        );
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
                              inProgress: submissionType === ACTIVE_MANDATE_ACTION && action_inProgress
                          },
                          onClick: () => {
                              handleSubmit(ACTIVE_MANDATE_ACTION);
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
