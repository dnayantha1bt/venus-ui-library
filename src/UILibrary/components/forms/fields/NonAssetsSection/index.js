import React, { useState, useEffect } from 'react';
import { Field, FieldArray, initialize } from 'redux-form';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { required } from 'redux-form-validators';
import _ from 'lodash';

import DatePicker from '../DatePicker';
import CurrencyField from '../CurrencyField';
import FundDetails from './FundDetails';

const DateAndValues = ({
    fields,
    hidden,
    disabled,
    formName,
    toggleHide,
    addHideIndex,
    deleteHideIndex,
    dirtyFormValues
}) => {
    console.log('data>>', dirtyFormValues);
    return (
        <>
            <Row className="input-row pH5">
                <Col xl={24} xs={24} className="label-wrapper">
                    <label className="input-title">
                        <b>Add details of non-Lgim assets and associated valuation dates:</b>
                    </label>
                </Col>
                <Col xl={24} xs={24} className="text-right mb-10">
                    {!disabled ? (
                        <span
                            className="btn btn-blue-o regular btn-max-200"
                            onClick={() => fields.unshift({}) && addHideIndex()}
                        >
                            + Add new date
                        </span>
                    ) : null}
                </Col>
            </Row>
            <div className={fields.length > 5 ? 'non-lgim-scroll' : 'scroll class'}>
                {fields.map((field, index) => (
                    <>
                        <Row
                            className={`input-row pH5 ${
                                _.get(dirtyFormValues, `dates[${index}].new`, false) ? 'highlight-input-row' : null
                            }`}
                            key={`${index}`}
                        >
                            <Col xl={9} md={8} xs={24} className="label-wrapper flex-row-wrap">
                                <label className="input-title pr10 mb0">Date</label>
                                <Field
                                    name={`${field}.date`}
                                    type="text"
                                    className="form-control pr10"
                                    component={DatePicker}
                                    validate={required({ message: 'Required' })}
                                    disabled={disabled}
                                />
                                <span
                                    className="i-icon-black cursor"
                                    onClick={() => fields.remove(index) && deleteHideIndex(index)}
                                >
                                    {!disabled && index !== 0 ? <i className="fa fa-close lgim-close-icon"></i> : null}
                                </span>
                            </Col>
                            <Col xl={9} md={8} xs={24}>
                                <Row className="input-row flex-row-wrap">
                                    <Col className="label-wrapper" xl={4}>
                                        <label className="input-title mb0">Value</label>
                                    </Col>
                                    <Col className="input-wrapper" xl={20}>
                                        <Field
                                            name={`${field}.value`}
                                            className="form-control"
                                            component={CurrencyField}
                                            options={{
                                                prefix: '£ ',
                                                props: {
                                                    precision: 0,
                                                    className: 'form-control',
                                                    placeholder: '10,000,000'
                                                }
                                            }}
                                            // validate={required({ message: 'Required' })}
                                            disabled={disabled}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl={6} md={8} xs={24} className="input-title-wrapper text-right">
                                {_.get(dirtyFormValues, `dates[${index}].funds`) ? (
                                    <span
                                        className="btn tpip-btn-blue regular btn-max-200"
                                        onClick={() => toggleHide(index)}
                                    >
                                        {!disabled
                                            ? 'Edit Detail'
                                            : disabled &&
                                              hidden[index] &&
                                              _.get(dirtyFormValues, `dates[${index}].funds`)
                                            ? 'Hide Details'
                                            : disabled && !hidden[index]
                                            ? 'Show Details'
                                            : 'Details'}
                                    </span>
                                ) : null}
                            </Col>
                        </Row>
                        {hidden[index] && _.get(dirtyFormValues, `dates[${index}].funds`) ? (
                            <>
                                <Row className="pH5">
                                    <Col xl={9} md={8} xs={8} className="label-wrapper flex-row-wrap pr10">
                                        <label className="input-title">
                                            <b>Fund name</b>
                                        </label>
                                    </Col>
                                    <Col xl={9} md={8} xs={8} className="label-wrapper flex-row-wrap">
                                        <label className="input-title">
                                            <b>Fund classification</b>
                                        </label>
                                    </Col>
                                    <Col xl={6} md={8} xs={8} className="input-title-wrapper">
                                        <label className="input-title">
                                            <b>Allocation</b>
                                        </label>
                                    </Col>
                                </Row>
                                <FieldArray
                                    name={`${field}.funds`}
                                    component={FundDetails}
                                    props={{
                                        formName,
                                        dirtyFormValues,
                                        disabled,
                                        indexValues: _.get(dirtyFormValues, `dates[${index}]`)
                                    }}
                                />
                            </>
                        ) : null}
                    </>
                ))}
            </div>
        </>
    );
};

const NonAssetsSection = props => {
    const { options } = props;
    const { disabled, formData, formName, initialValues } = options;
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState({});

    useEffect(() => {
        if (initialValues) dispatch(initialize(formName, initialValues));
    }, []);

    const toggleHide = index => {
        hidden[index] ? (hidden[index] = !hidden[index]) : (hidden[index] = true);
        setHidden({ ...hidden });
    };

    const deleteHideIndex = index => {
        if (Object.keys(hidden).length) {
            for (let key in hidden) {
                let intKey = parseInt(key);
                if (intKey === index) {
                    delete hidden[index];
                }
                if (key > index) {
                    hidden[key - 1] = hidden[key];
                    delete hidden[key];
                }
            }
            setHidden({ ...hidden });
        }
    };

    const addHideIndex = () => {
        if (Object.keys(hidden).length) {
            const newArray = _.mapKeys(hidden, function(value, key) {
                let newIdx = parseInt(key) + 1;
                return newIdx;
            });
            setHidden({ ...newArray });
        }
    };

    return (
        <>
            <FieldArray
                name="dates"
                component={DateAndValues}
                props={{
                    toggleHide,
                    deleteHideIndex,
                    addHideIndex,
                    hidden,
                    disabled,
                    dirtyFormValues: formData,
                    formName
                }}
            />
        </>
    );
};

export default NonAssetsSection;
