import React from 'react';
import { Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Col, Row } from 'antd';
import InputField from '../InputField';

const AddressField = props => {
    const {
        options: { title, disabled }
    } = props;
    return (
        <>
            <div className="input-row">
                <p className="sub-title">{title}</p>
                <div className="full-content-wrap address-content-wrap">
                    <Row className="input-row">
                        <Col xl={4} lg={12} xs={24} className="label-wrapper">
                            <label className="input-title">Address</label>
                        </Col>
                        <Col xl={20} lg={12} xs={24}>
                            <Row className="input-row">
                                <Field
                                    disabled={disabled}
                                    name="address1"
                                    className="form-control"
                                    component={InputField}
                                    validate={required({ message: 'Required' })}
                                />
                            </Row>
                            <Row className="input-row">
                                <Field
                                    disabled={disabled}
                                    name="address2"
                                    className="form-control"
                                    component={InputField}
                                />
                            </Row>
                            <Row className="input-row">
                                <Field
                                    disabled={disabled}
                                    name="address3"
                                    className="form-control"
                                    component={InputField}
                                />
                            </Row>
                        </Col>
                    </Row>
                    <Row className="input-row">
                        <Col xl={12} lg={12} xs={24}>
                            <Row className="input-row">
                                <Col xl={8} lg={12} xs={24} className="label-wrapper">
                                    <label className="input-title">City</label>
                                </Col>
                                <Col xl={16} lg={12} xs={24} className="input-wrapper custom-input">
                                    <Field
                                        disabled={disabled}
                                        name="city"
                                        className="form-control"
                                        component={InputField}
                                        validate={required({ message: 'Required' })}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={12} lg={12} xs={24}>
                            <Row className="input-row">
                                <Col xl={8} lg={12} xs={24} className="label-wrapper">
                                    <label className="input-title extra-padding">Postcode</label>
                                </Col>
                                <Col xl={16} lg={12} xs={24} className="input-wrapper custom-input">
                                    <Field
                                        disabled={disabled}
                                        name="postalCode"
                                        className="form-control"
                                        component={InputField}
                                        validate={required({ message: 'Required' })}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default AddressField;
