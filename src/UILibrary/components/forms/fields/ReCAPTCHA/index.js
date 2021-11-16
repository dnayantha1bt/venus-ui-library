import React from "react";
import GoogleReCAPTCHA from 'react-google-recaptcha';

const ReCAPTCHA = ({ input, meta: { touched, error }, ...props }) => {
    let hasError = touched && error !== undefined;

    return (
        <div className="field-wrapper">
            <input type="text" {...input} {...props} hidden={true} />

            <GoogleReCAPTCHA sitekey={props.recaptchaKey} onChange={data => input.onChange(data)} />
            {hasError && <span className="error">{error}</span>}
        </div>
    );
};

export default ReCAPTCHA;