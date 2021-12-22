import React from 'react';
import { reduxForm, getFormValues } from 'redux-form';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';

import FormBase from './FormBase';
import constants from '../../../constants';

const { GENERATE_FORMS_TYPE_SIMPLE, GENERATE_FORMS_TYPE_WITH_CHILDREN } = constants;

const simpleFormFormat = props => {
    const { handleSubmit, disabled, formFieldData, className, formHooks } = props;

    return (
        <form className={className} onSubmit={handleSubmit}>
            <div className="form-body">
                <FormBase data={formFieldData} disabled={disabled} formHooks={formHooks} />
            </div>
        </form>
    );
};

const formWithChildrenFormat = props => {
    const { handleSubmit, children, className } = props;
    return (
        <form className={className} onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

let FormGenerator = props => {
    const { formType = GENERATE_FORMS_TYPE_SIMPLE, name } = props;

    const dirtyFormValues = useSelector(getFormValues(name));

    return formType === GENERATE_FORMS_TYPE_SIMPLE ? (
        simpleFormFormat({ dirtyFormValues, ...props })
    ) : formType === GENERATE_FORMS_TYPE_WITH_CHILDREN ? (
        formWithChildrenFormat({ dirtyFormValues, ...props })
    ) : (
        <></>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        form: ownProps.name
    };
};

export default compose(
    connect(mapStateToProps),
    reduxForm({})
)(FormGenerator);
