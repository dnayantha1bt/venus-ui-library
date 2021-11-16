import React from 'react';
import NumberFormat from 'react-number-format';

const NumberField = ({ input, meta: { touched, error }, options, ...props }) => {
    let hasError = touched && error !== undefined;

    const className = `input-field ${hasError ? 'has-error' : ''} ${props.className ? props.className : ''}`;
    const isAllowed = ({ formattedValue, value }) => {
        if (options && options.allowNegative && value === '-') {
            return true;
        }

        if (options && (options.min || options.max)) {
            const min = options && options.min ? options.min : false;
            const max = options && options.max ? options.max : false;

            return value === '' || ((min ? value >= min : true) && (max ? value <= max : true));
        }

        if (options && (options.minLength || options.maxLength)) {
            const minLength = options && options.minLength ? options.minLength : false;
            const maxLength = options && options.maxLength ? options.maxLength : false;

            return (
                value === '' ||
                ((minLength ? value.toString().length >= minLength : true) &&
                    (maxLength ? value.toString().length <= maxLength : true))
            );
        }

        return true;
    };
    return (
        <div
            className={`field-wrapper ${props.prefix && 'prefix-wrapper'} ${props.suffix && 'suffix-wrapper'}`}
            title={props.disabled && props.title ? props.title : ''}
        >
            {props.prefix && <span className="prefix">{props.prefix}</span>}
            <input hidden={true} {...input} {...props} />
            <NumberFormat
                {...options}
                disabled={props && (props.disabled || (options && options.disabled))}
                value={input.value}
                className={className}
                placeholder={props && (props.placeholder || (options && options.placeholder))}
                isAllowed={isAllowed}
                onValueChange={({ formattedValue, value }) => {
                    input.onChange(value);
                    input.onFocus(value);
                }}
            />
            {props.suffix && <span className="suffix">{props.suffix}</span>}
            {hasError && <span className="error">{error}</span>}
        </div>
    );
};

export default NumberField;