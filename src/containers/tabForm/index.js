import React from 'react';
import { formFields } from './formConfig';
import CreateFormComponent from '../../UILibrary/components/forms';
import constants from '../../UILibrary/constants';
import { FORM_NAME, FORM_TITLE, REQUEST_A_FORMAL_PROPOSAL_FROM_US } from './constants';

const {
    FORM_TYPE_WITH_TABS,
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST,
    ON_SAVE_MESSAGE,
    ON_SUBMIT_MESSAGE,
    FORM_SECTION_INCLUDE_NEW
} = constants;

const TabForm = props => {
    const formSubmit = formData => {
        console.log('formData', formData);
    };

    const formTabs = [
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: 'tab1',
            tabName: 'Form 1',
            formFieldFunction: formFields
        },
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: 'tab2',
            tabName: 'Form 2',
            formFieldFunction: formFields
        }
    ];

    return (
        <CreateFormComponent
            formTabs={formTabs}
            formName={FORM_NAME}
            formType={FORM_TYPE_WITH_TABS}
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

export default TabForm;
