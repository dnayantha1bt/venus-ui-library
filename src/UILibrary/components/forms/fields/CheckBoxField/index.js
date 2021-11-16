import React from 'react';
import { Checkbox } from 'antd';

const CheckboxField = ({ input, meta: { touched, error }, disabled, ...props }) => {
    let hasError = touched && error !== undefined;
    return (
        <div className="field-wrapper checkbox-holder">
            <input
                {...input}
                {...props}
                hidden={true}
                type="checkbox"
                value={input.value}
                checked={input.value === true}
            />
            <Checkbox
                checked={(typeof input.value === 'boolean' && input.value) || props.checked}
                onChange={e => input.onChange(e.target.checked)}
                disabled={disabled}
            ></Checkbox>
            {hasError && <span className="error">{error}</span>}
        </div>
    );
};

export default CheckboxField;