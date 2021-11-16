import React from "react";
import { Input } from 'antd';
import { passwordStrength } from '../../validations/fieldValidations';

const PasswordField = ({ input, meta: { touched, error }, ...props }) => {
    let hasError = touched && error !== undefined;

    const className = `input-field ${hasError ? 'has-error' : ''} ${props.className ? props.className : ''}`;
    const strengthMap = passwordStrength(input.value);

    return (
        <div className="field-wrapper">
            <Input.Password {...input} {...props} />
            <div className="password-strength-holder">
                {strengthMap.map((className, cKey) => (
                    <span className={`${className} password-line`} key={cKey}></span>
                ))}
            </div>
            {hasError && <span className="error">{error}</span>}
        </div>
    );
};

export default PasswordField;