import React, { useState, useEffect } from 'react';
import { Field, change } from 'redux-form';
import { useDispatch } from 'react-redux';
import { required, numericality } from 'redux-form-validators';
import { Col, Row } from 'antd';

import InputField from '../InputField';
import NumberField from '../NumberField';
import {
    CURRENT_ASSET_ALLOCATION_TYPE,
    ASSET_ALLOCATION_TOTAL,
    simpleAssetAllocationFields,
    detailAssetAllocationFields
} from './constants';

const FormFields = ({ label, field, total, ...formData }) => {
    const tempMax = !Number(formData[field]) ? 100 - total : 100 - (total - Number(formData[field]));
    return (
        <Col xl={12} lg={12} xs={24}>
            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                <label className="input-title">{label}</label>
            </Col>
            <Col xl={12} lg={12} xs={24}>
                <Row className="input-row">
                    <Field
                        name={field}
                        className="form-control"
                        component={NumberField}
                        suffix="%"
                        options={{
                            decimalScale: 1,
                            placeholder: 0,
                            allowNegative: false,
                            disabled: !formData[field] && total === 100,
                            min: 0,
                            max: parseFloat(tempMax.toFixed(1))
                        }}
                    />
                </Row>
            </Col>
        </Col>
    );
};

const AssetsValueSeparator = props => {
    const { options } = props;
    const { formName, asyncFormData, tabKey } = options;
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        let assetAllocationTotalName = ASSET_ALLOCATION_TOTAL;
        let total = 0;
        let filedArray = [];
        options[CURRENT_ASSET_ALLOCATION_TYPE] === 'detail'
            ? (filedArray = detailAssetAllocationFields)
            : (filedArray = simpleAssetAllocationFields);
        if (asyncFormData) {
            for (let item of filedArray) {
                if (!asyncFormData[item.field] || !Number(asyncFormData[item.field])) continue;

                total += Number(asyncFormData[item.field]);
            }
        }
        setTotal(Number(total.toFixed(1)));
        if (tabKey) {
            assetAllocationTotalName = `${tabKey}.${ASSET_ALLOCATION_TOTAL}`;
            // store.dispatch(change(formName, `${tabKey}.${ASSET_ALLOCATION_TOTAL}`, total.toFixed(1)));
        }
        dispatch(change(formName, assetAllocationTotalName, total.toFixed(1)));
    }, [asyncFormData]);

    return (
        <>
            <Row gutter={8} className="input-row">
                {options[CURRENT_ASSET_ALLOCATION_TYPE] === 'simple'
                    ? simpleAssetAllocationFields.map(fd => {
                          return <FormFields label={fd.label} field={fd.field} total={total} {...asyncFormData} />;
                      })
                    : options[CURRENT_ASSET_ALLOCATION_TYPE] === 'detail'
                    ? detailAssetAllocationFields.map(fd => {
                          return <FormFields label={fd.label} field={fd.field} total={total} {...asyncFormData} />;
                      })
                    : null}

                <Col xl={24} lg={24} xs={24}>
                    <Col xl={18} lg={12} xs={24} className="label-wrapper">
                        <label className="input-title text-bold">Total</label>
                    </Col>
                    <Col xl={6} lg={12} xs={24}>
                        <Row className="input-row">
                            <Field
                                name={ASSET_ALLOCATION_TOTAL}
                                className="form-control"
                                component={InputField}
                                suffix="%"
                                editable={false}
                                validate={[
                                    required({ message: 'Required' }),
                                    numericality({
                                        int: true,
                                        '=': 100,
                                        message: 'Invalid entry. Total should be 100%.'
                                    })
                                ]}
                            />
                        </Row>
                    </Col>
                </Col>
            </Row>
        </>
    );
};

export default AssetsValueSeparator;
