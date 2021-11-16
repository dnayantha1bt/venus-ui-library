import React from "react";
import NotificationHelper from '../../../../helpers/NotificationHelper';

const formatMsg = /[#$%^*()+\=\[\]{};':"\\|<>\/]+/;

const TextArea = ({ input, meta: { touched, error }, ...props }) => {
    let hasError = touched && error !== undefined;
    const ignoreCharacterValidation =
        props.options && props.options.ignoreCharacterValidation ? props.options.ignoreCharacterValidation : false;
    if (!hasError) {
        if (formatMsg.test(input.value) && !ignoreCharacterValidation) {
            hasError = true;
            error = 'Special characters are not allowed.';
            NotificationHelper.getInstance().warning('Special characters are not allowed.');
            input.onChange(input.value.replace(/[#$%^&*()+\=\[\]{};':"\\|<>\/]+/, ''));
        }
    }

    const { onBlur: _, ...restInput } = input;

    const className = `input-field text-area ${hasError ? 'has-error' : ''} ${props.className ? props.className : ''}`;
    return (
        <div className="field-wrapper">
            <textarea {...restInput} {...props} className={className} />
            {hasError && <span className="error">{error}</span>}
        </div>
    );
};

export default TextArea;