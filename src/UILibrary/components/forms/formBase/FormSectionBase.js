import React from 'react';
import { getFormValues, FormSection } from 'redux-form';
import { useSelector } from 'react-redux';

import FormBase from './FormBase';
import constants from '../../../constants';

const { GENERATE_FORM_SECTION_TYPE_SIMPLE } = constants;

const simpleFormSection = props => {
    const { formSectionName, formFieldData, disabled, formHooks } = props;
    return (
        <FormSection name={formSectionName}>
            <FormBase data={formFieldData} disabled={disabled} formHooks={formHooks} />
        </FormSection>
    );
};

let FormSectionBase = props => {
    const { formSectionType = GENERATE_FORM_SECTION_TYPE_SIMPLE, formName } = props;

    const dirtyFormValues = useSelector(getFormValues(formName));

    return formSectionType === GENERATE_FORM_SECTION_TYPE_SIMPLE ? (
        simpleFormSection({ dirtyFormValues, ...props })
    ) : (
        <></>
    );
};

export default FormSectionBase;