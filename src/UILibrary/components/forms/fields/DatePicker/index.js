import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';
import Moment from '../../../../helpers/Moment';

const DatePicker = ({ input, meta: { touched, error }, options, ...props }) => {
    let hasError = touched && error !== undefined;
    const { onBlur } = input;
    return (
        <div className={`field-wrapper date-field ${hasError ? 'has-error' : ''}`}>
            <input type="text" {...input} {...props} hidden={true} />
            <AntDatePicker
                {...options}
                disabled={props.disabled}
                value={input.value ? moment(input.value, 'YYYY-MM-DD') : null}
                format="DD-MM-YYYY"
                onBlur={() => setTimeout(onBlur, 500)}
                onChange={(data, dateString) => {
                    input.onChange(
                        !dateString || Moment.dateOnly(dateString) === 'Invalid date'
                            ? null
                            : moment(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD')
                    );
                }}
            />
            {hasError && <span className="error">{error}</span>}
        </div>
    );
};

export default DatePicker;
