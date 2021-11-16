import React from 'react';
import SimpleForm from './simpleForm';
import FormWithTabs from './formWithTabs';

import constants from '../../constants';
const { FORM_TYPE_SINGLE_PAGE, FORM_TYPE_WITH_TABS } = constants;
let CreateForm = props => {
    const { formType } = props;
    return (
        <>
            <div className="lgim-styles-wrapper">
                {formType === FORM_TYPE_SINGLE_PAGE ? (
                    <SimpleForm {...props} />
                ) : formType === FORM_TYPE_WITH_TABS ? (
                    <FormWithTabs {...props} />
                ) : null}
            </div>
        </>
    );
};

export default CreateForm;
