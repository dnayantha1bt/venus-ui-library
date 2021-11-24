import React from 'react';
import { Input } from 'antd';

const PasswordVisibileField = ({ input, meta: { touched, error }, ...props }) => {
    let hasError = touched && error !== undefined;
    return (
        <div className="field-wrapper">
            <Input.Password {...input} {...props} />
            {hasError && <span className="error">{error}</span>}
        </div>
    );
};

export default PasswordVisibileField;
