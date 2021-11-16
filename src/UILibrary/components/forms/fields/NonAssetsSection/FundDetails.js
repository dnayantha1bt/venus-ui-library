import React from 'react';
import { Field, change } from 'redux-form';
import { useDispatch } from 'react-redux';
import { Row, Col, Tooltip } from 'antd';
import _ from 'lodash';
import { required, numericality } from 'redux-form-validators';

import InputField from '../InputField';
import NumberField from '../NumberField';
import CurrencyField from '../CurrencyField';
import SelectOptions from '../SelectOptions';
import { fundClasifications } from './constants';

const FundDetails = ({ fields, disabled, formName, indexValues, dirtyFormValues }) => {
    const dispatch = useDispatch();
    const tempFunds = _.get(dirtyFormValues, fields.name);
    const actTotal = _.get(dirtyFormValues, `${fields.name.split('.')[0]}.total`);
    const total =
        actTotal && typeof actTotal === 'string'
            ? parseFloat(actTotal)
            : actTotal && typeof actTotal === 'number'
            ? actTotal
            : 0;

    const initializeTotal = (totalFieldName, section, value, index, allocationParam) => {
        const tempSection = _.get(dirtyFormValues, section);
        let result = 0;
        const modifiedSection = tempSection
            .map((fund, i) => {
                if (index === i) return value ? { allocation: parseFloat(value) } : null;
                else if (fund && fund.allocation) return { allocation: parseFloat(fund.allocation) };
                else return null;
            })
            .filter(a => a && a.allocation);
        result = modifiedSection.length ? _.sumBy(modifiedSection, 'allocation') : 0;
        if (result <= 100) {
            dispatch(change(formName, `${totalFieldName}`, result));
        }
    };

    const iIconText = (
        <div>
            <p>
                PV01 and IE01 data should be available from your LDI provider. Note that positive numbers should
                typically be entered.
            </p>

            <p>
                PV01 - Please enter the increase in asset value that would expected in £ terms if interest rates fell
                0.01%.
            </p>

            <p>
                IE01 - Please enter the increase in asset value that would expected in £ terms if price inflation
                expectations increased 0.01%.
            </p>

            <p>
                If you do not know this information then you can simply leave these boxes blank, and we will treat the
                LDI assets as cash.
            </p>
        </div>
    );

    return (
        <>
            {fields.map((field, index) => (
                <>
                    <Row className="input-row pH5">
                        <Col xl={9} md={8} xs={8} className="label-wrapper flex-row-wrap pr20 custom-100">
                            <Field
                                name={`${field}.fundName`}
                                className="form-control pr20 input-field w-100"
                                component={InputField}
                                validate={required({ message: 'Required' })}
                                disabled={disabled}
                            />
                        </Col>
                        <Col xl={9} md={8} xs={8} className="label-wrapper pr20 flex-row-wrap">
                            <Field
                                name={`${field}.fundType`}
                                className="form-control input-field w-100"
                                component={SelectOptions}
                                options={fundClasifications}
                                validate={required({ message: 'Required' })}
                                disabled={disabled}
                            />
                        </Col>
                        <Col xl={6} md={8} xs={8} className="label-wrapper flex-row-wrap">
                            <Field
                                name={`${field}.allocation`}
                                className="form-control pr10"
                                component={NumberField}
                                options={{
                                    decimalScale: 1,
                                    placeholder: 0,
                                    allowNegative: false,
                                    disabled: !_.get(dirtyFormValues, `${field}.allocation`) && total === 100,
                                    min: 0,
                                    max: !Number(_.get(dirtyFormValues, `${field}.allocation`))
                                        ? 100 - total
                                        : 100 - (total - Number(_.get(dirtyFormValues, `${field}.allocation`)))
                                }}
                                props={{
                                    suffix: '%'
                                }}
                                onChange={e => {
                                    initializeTotal(
                                        `${fields.name.split('.')[0]}.total`,
                                        fields.name,
                                        e,
                                        index,
                                        `${field}.allocation`
                                    );
                                }}
                                disabled={disabled}
                            />
                            <span
                                className="i-icon-black cursor mr0  lgim-icon-position"
                                onClick={() => {
                                    initializeTotal(
                                        `${fields.name.split('.')[0]}.total`,
                                        fields.name,
                                        null,
                                        index,
                                        `${field}.allocation`
                                    );
                                    fields.remove(index);
                                }}
                            >
                                {!disabled ? <i className="fa fa-close lgim-close-icon"></i> : null}
                            </span>
                        </Col>
                    </Row>
                    {tempFunds && tempFunds.length && tempFunds[index] && tempFunds[index].fundType === 'LDI' ? (
                        <Row className="input-row flex-row-sb mt-20">
                            <Col xl={24} xs={24} className="text-right flex-row-fe">
                                <Row className="flex-row-fe pr20">
                                    <Col xl={24} xs={24} className="input-title-wrapper text-right flex-row-wrap">
                                        <Tooltip placement="top" title={iIconText}>
                                            <span className="i-icon mr10">
                                                <i className="fa fa-info-circle"></i>
                                            </span>
                                        </Tooltip>
                                        <label className="input-title pr10 mb0">PV01</label>
                                        <Field
                                            name={`${field}.pv`}
                                            className="form-control pr10 input-200"
                                            component={CurrencyField}
                                            disabled={disabled}
                                            options={{
                                                prefix: '£ ',
                                                props: {
                                                    precision: 0,
                                                    className: 'form-control',
                                                    placeholder: '10,000,000'
                                                }
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="flex-row-fe">
                                    <Col xl={24} xs={24} className="input-title-wrapper text-right flex-row-wrap">
                                        <label className="input-title pr10 mb0">IE01</label>
                                        <Field
                                            name={`${field}.ie`}
                                            className="form-control pr10 input-200"
                                            component={CurrencyField}
                                            disabled={disabled}
                                            options={{
                                                prefix: '£ ',
                                                props: {
                                                    precision: 0,
                                                    className: 'form-control',
                                                    placeholder: '10,000,000'
                                                }
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ) : null}
                </>
            ))}

            <Row className="input-row flex-row-sb mt-20 pH5">
                <Col xl={12} md={12} xs={12} className="label-wrapper">
                    {!disabled ? (
                        <span className="btn btn-blue-o regular btn-max-200" onClick={() => fields.push()}>
                            + Add new fund
                        </span>
                    ) : null}
                </Col>
                <Col xl={12} md={12} xs={12} className="text-right flex-row-fe">
                    <Row className="flex-row-fe">
                        <Col xl={22} xs={24} className="input-title-wrapper text-right flex-row-wrap">
                            <label className="input-title pr10 mb0">Total</label>
                            <Field
                                name={`${fields.name.split('.')[0]}.total`}
                                className="form-control pr10 input-200"
                                component={NumberField}
                                options={{
                                    decimalScale: 1,
                                    disabled: true
                                }}
                                props={{
                                    suffix: '%'
                                }}
                                validate={[
                                    required({ message: 'Required' }),
                                    numericality({
                                        int: true,
                                        '=': indexValues && indexValues.value ? 100 : 0,
                                        message: `Invalid entry. Total should be ${
                                            indexValues && indexValues.value ? '100' : '0'
                                        }%.`
                                    })
                                ]}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default FundDetails;
