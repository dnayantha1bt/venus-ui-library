import React from "react";
import CurrencyInput from './currencyInput';

const CurrencyField = ({ input, meta: { touched, error }, options, ...props }) => {
    let hasError = touched && error !== undefined;

    const className = `input-field ${hasError ? 'has-error' : ''} ${
        options.props && options.props.className ? options.props.className : ''
    }`;

    return (
        <div
            className={`field-wrapper ${options.prefix && 'prefix-wrapper'} ${options.suffix && 'suffix-wrapper'}`}
            title={props.disabled && props.title ? props.title : ''}
        >
            <input hidden={true} {...input} {...props} />
            {options.prefix && <span className="prefix">{options.prefix}</span>}
            <CurrencyInput
                {...options.props}
                {...props}
                className={className}
                value={input.value}
                onChangeEvent={(event, maskedvalue, floatvalue) => {
                    input.onChange(floatvalue);
                }}
            />
            {options.suffix && <span className="suffix">{options.suffix}</span>}
            {hasError && <span className="error">{error}</span>}
        </div>
    );
};

export default CurrencyField;