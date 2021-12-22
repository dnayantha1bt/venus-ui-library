import React from 'react';
import { formFields } from './formConfig';
import CreateFormComponent from '../../../UILibrary/components/forms';
import constants from '../../../UILibrary/constants';
import { FORM_NAME, FORM_TITLE, REQUEST_A_FORMAL_PROPOSAL_FROM_US } from './constants';

const {
    FORM_TYPE_SINGLE_PAGE,
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST,
    ON_SAVE_MESSAGE,
    ON_SUBMIT_MESSAGE
} = constants;

const SimpleForm = props => {
    const formSubmit = formData => {
        console.log('formData', formData);
    };

    return (
        <CreateFormComponent
            formFieldFunction={formFields}
            formName={FORM_NAME}
            formType={FORM_TYPE_SINGLE_PAGE}
            disabled={false}
            action_inProgress={false}
            handleFormSubmit={formSubmit}
            options={{
                title: FORM_TITLE,
                titleIicon: REQUEST_A_FORMAL_PROPOSAL_FROM_US,
                saveButton: {
                    title: BUTTON_TITLE_SAVE,
                    showButton: true
                },
                submitButton: {
                    title: BUTTON_TITLE_REQUEST,
                    showButton: true
                },
                onSubmitMessage: ON_SUBMIT_MESSAGE,
                onSaveMessage: ON_SAVE_MESSAGE
            }}
        />
    );
};

export default SimpleForm;
