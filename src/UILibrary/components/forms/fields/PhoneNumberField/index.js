import React from 'react';
import NumberFormat from 'react-number-format';

const PhoneNumberFormat = /^[0-9 ()+-]+$/;

const PhoneNumberField = ({ input, meta: { touched, error }, disabled, options, editable, ...props }) => {
    let hasError = touched && error !== undefined;

    const className = `input-field ${hasError ? 'has-error' : ''} ${props.className ? props.className : ''}`;

    return (
        <div
            className={`field-wrapper ${props.prefix && 'prefix-wrapper'} ${props.suffix && 'suffix-wrapper'}`}
            title={props.disabled && props.title ? props.title : ''}
        >
            {props.prefix && <span className="prefix">{props.prefix}</span>}
            <input hidden={true} {...input} {...props} />
            <NumberFormat
                {...options}
                type="tel"
                format="+###############"
                allowEmptyFormatting
                disabled={props && (props.disabled || (options && options.disabled))}
                value={input.value}
                className={className}
                placeholder={props && (props.placeholder || (options && options.placeholder))}
                onValueChange={({ formattedValue, value }) => {
                    input.onChange('+' + value);
                    input.onFocus('+' + value);
                }}
            />
            {props.suffix && <span className="suffix">{props.suffix}</span>}
            {hasError && <span className="error">{error}</span>}
        </div>
    );
};

export default PhoneNumberField;
