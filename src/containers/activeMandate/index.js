import React from 'react';

import { TEXT, FORM_TITLE, REQUEST_A_FORMAL_PROPOSAL_FROM_US } from './constants';
import CreateActivateSection from '../../UILibrary/components/activations';
import constants from '../../UILibrary/constants';

const { ACTIVATION_TYPE_DEFAULT, BUTTON_TITLE_ACTIVATE } = constants;

let ActiveMandate = props => {

    const formSubmit = (action) => {
        console.log(action)
    }
    
    return (
        <>
            <CreateActivateSection
                activationType={ACTIVATION_TYPE_DEFAULT}
                text={TEXT}
                handleFormSubmit={formSubmit}
                options={{
                    title: FORM_TITLE,
                    titleIicon: REQUEST_A_FORMAL_PROPOSAL_FROM_US,
                    saveButton: false,
                    submitButton: {
                        title: BUTTON_TITLE_ACTIVATE
                    },
                    onSubmitMessage: 'Activated.',
                    fetchEntityDataAfterSubmit: false
                }}
                {...props}
            />
        </>
    );
};

export default ActiveMandate;