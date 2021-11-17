import React from 'react';
import DefaultActivation from './templates/defaultActivation';
import CreateForm from '../forms';

import constants from '../../constants';
const {
    STEP_ACTION_ACTIVATE,
    ACTIVATION_TYPE_DEFAULT,
    ACTIVATION_TYPE_USING_FORM,
    ACTIVATION_TYPE_USING_FORM_TABS,
    FORM_TYPE_SINGLE_PAGE,
    FORM_TYPE_WITH_TABS
} = constants;

let CreateActivateSection = props => {
    const { activationType, formFieldData, formHooks, formName, options, formTabs, formFieldFunction } = props;

    return (
        <>
            <div className="lgim-styles-wrapper">
                {activationType === ACTIVATION_TYPE_DEFAULT ? (
                    <DefaultActivation {...props} />
                ) : activationType === ACTIVATION_TYPE_USING_FORM ? (
                    <CreateForm
                        submitAction={STEP_ACTION_ACTIVATE}
                        formFieldData={formFieldData}
                        formFieldFunction={formFieldFunction}
                        formHooks={formHooks}
                        formName={formName}
                        formType={FORM_TYPE_SINGLE_PAGE}
                        options={options}
                        {...props}
                    />
                ) : activationType === ACTIVATION_TYPE_USING_FORM_TABS ? (
                    <CreateForm
                        submitAction={STEP_ACTION_ACTIVATE}
                        formTabs={formTabs}
                        formHooks={formHooks}
                        formName={formName}
                        formType={FORM_TYPE_WITH_TABS}
                        options={options}
                        {...props}
                    />
                ) : null}
            </div>
        </>
    );
};

export default CreateActivateSection;
