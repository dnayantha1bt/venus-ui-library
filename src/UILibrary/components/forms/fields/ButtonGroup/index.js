import React from 'react';

const ButtonGroup = ({ input, meta: { touched, error }, options, defaultValue, ...props }) => {
    let hasError = touched && error !== undefined;

    return (
        <div className="field-wrapper">
            {options.map((option, oKey) => {
                const checkedBool =
                    (input.value && option.value === input.value) ||
                    (!input.value && defaultValue && option.value === defaultValue);

                return (
                    <label
                        key={oKey}
                        className={`button-group ${checkedBool ? 'active' : ''}  ${
                            props.disabled ? 'cursor-default' : 'cursor-pointer'
                        }`}
                    >
                        <input type="radio" {...input} {...props} value={option.value} checked={checkedBool || false} />
                        {option.icon && (
                            <span className="button-icon">
                                <i className={`fa ${option.icon} icon`} aria-hidden="true"></i>
                            </span>
                        )}
                        {option.title}
                    </label>
                );
            })}
            {hasError && <span className="error">{error}</span>}
        </div>
    );
};

export default ButtonGroup;
