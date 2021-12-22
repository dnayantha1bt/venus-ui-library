import React from 'react';
import DefaultActivation from './templates/defaultActivation';
import CreateForm from '../forms';

import constants from '../../constants';
const {
    ACTIVE_MANDATE_ACTION,
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
            {activationType === ACTIVATION_TYPE_DEFAULT ? (
                <div className="lgim-styles-wrapper">
                    <section className="active-scheme-options">
                        <div className="content clearfix">
                            <DefaultActivation {...props} />
                        </div>
                    </section>
                </div>
            ) : activationType === ACTIVATION_TYPE_USING_FORM ? (
                <CreateForm
                    submitAction={ACTIVE_MANDATE_ACTION}
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
                    submitAction={ACTIVE_MANDATE_ACTION}
                    formTabs={formTabs}
                    formHooks={formHooks}
                    formName={formName}
                    formType={FORM_TYPE_WITH_TABS}
                    options={options}
                    {...props}
                />
            ) : null}
        </>
    );
};

export default CreateActivateSection;
