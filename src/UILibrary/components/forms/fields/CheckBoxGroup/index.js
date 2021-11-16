import React from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = ({ input, meta: { touched, error }, ...props }) => {
    let hasError = touched && error !== undefined;

    return (
        <div className="field-wrapper checkbox-holder">
            <Checkbox.Group
                options={props.options}
                {...props}
                value={input.value}
                onChange={e => input.onChange(e)}
            ></Checkbox.Group>
            {hasError && <span className="error">{error}</span>}
        </div>
    );
};

export default CheckboxGroup;