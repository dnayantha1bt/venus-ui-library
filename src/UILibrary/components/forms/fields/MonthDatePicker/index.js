import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const getDaysInMonth = (month, year) => {
    // Since no month has fewer than 28 days
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
};

const MonthDatePicker = ({ input, meta: { touched, error }, options, ...props }) => {
    const { month: monthValue, date: dateValue } = input.value || {};
    const initialState = {
        dates: []
    };
    const orderReverse = options.orderReverse || false;
    const [date, setDate] = useState(initialState);
    const [dateChanged, dateChange] = useState(undefined);
    const [monthChanged, monthChange] = useState(undefined);
    let hasError = touched && error !== undefined;

    let newDate = new Date();
    const onChangeMonth = value => {
        const getDates = getDaysInMonth(Number(value), newDate.getFullYear());

        setDate({
            ...date,
            selectedMonth: value,
            dates: getDates
        });

        monthChange(value);
        if (value && dateChanged) {
            input.onChange({
                month: value,
                date: dateChanged
            });
        }
    };

    const onChangeDate = value => {
        dateChange(value);

        if (value && monthChanged) {
            input.onChange({
                month: monthChanged,
                date: value
            });
        }
    };

    useEffect(() => {
        monthChange(monthValue);
    }, [monthValue]);

    useEffect(() => {
        dateChange(dateValue);
    }, [dateValue]);

    useEffect(() => {
        if (date.dates.length < 1 && monthValue) {
            const getDates = getDaysInMonth(Number(monthValue), newDate.getFullYear());
            setDate({
                ...date,
                dates: getDates
            });
        }
    }, [date, monthValue, newDate]);

    useEffect(() => {
        if (monthChanged && dateChanged && date.dates.length < dateChanged) {
            dateChange(undefined);
        }
    }, [monthChanged]);

    return (
        <div className={`field-wrapper date-field ${hasError ? 'has-error' : ''}`}>
            <input type="text" {...input} {...props} hidden={true} />
            <div className="custom-date">
                <Select
                    value={monthChanged}
                    disabled={props.disabled}
                    placeholder="Month"
                    onChange={onChangeMonth}
                    className={`custom-date-select ${orderReverse ? 'right' : 'left'}`}
                >
                    <Option value="0">January</Option>
                    <Option value="1">February</Option>
                    <Option value="2">March</Option>
                    <Option value="3">April</Option>
                    <Option value="4">May</Option>
                    <Option value="5">June</Option>
                    <Option value="6">July</Option>
                    <Option value="7">August</Option>
                    <Option value="8">September</Option>
                    <Option value="9">October</Option>
                    <Option value="10">November</Option>
                    <Option value="11">December</Option>
                </Select>
                <Select
                    value={dateChanged}
                    disabled={props.disabled}
                    placeholder="Date"
                    onChange={onChangeDate}
                    className={`custom-date-select ${orderReverse ? 'left' : 'right'}`}
                >
                    {date.dates.map((item, index) => {
                        return (
                            <Option key={index} value={index + 1}>
                                {index + 1}
                            </Option>
                        );
                    })}
                </Select>
            </div>
            {hasError && <span className="error float-left">{error}</span>}
        </div>
    );
};

export default MonthDatePicker;