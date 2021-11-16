import React, { useEffect, useState } from 'react';
import { Field, FieldArray } from 'redux-form';
import moment from 'moment';
import { Col, Row } from 'antd';
import { required, numericality } from 'redux-form-validators';

import CurrencyField from '../CurrencyField';
import DatePicker from '../DatePicker';
import { DEFICIT_CONTRIBUTION_VALUE, DEFICIT_CONTRIBUTION_DATE } from './constants';

const renderDificitField = ({ fields, meta: { error }, setFormFields, setFormLength }) => {
    setFormFields(fields);
    setFormLength(fields.length);
    return (
        <div>
            {fields.map((field, index) => (
                <Row gutter={20} className="input-row">
                    <i
                        onClick={() => {
                            fields.remove(index);
                        }}
                        className="remove-icon  fa fa-times"
                        aria-hidden="true"
                    ></i>
                    <Col xl={12} lg={12} xs={24}>
                        <Row className="input-row">
                            <Col className="label-wrapper" xl={12} xs={24}>
                                <label className="input-title">Deficit Contribution</label>
                            </Col>
                            <Col className="input-wrapper" xl={12} xs={24}>
                                <Field
                                    name={`${field}.${DEFICIT_CONTRIBUTION_VALUE}`}
                                    className="form-control"
                                    component={CurrencyField}
                                    options={{
                                        name: `${field}.${DEFICIT_CONTRIBUTION_VALUE}`,
                                        prefix: '£',
                                        props: {
                                            precision: 0,
                                            className: 'form-control',
                                            placeholder: '10,000,000'
                                        }
                                    }}
                                    validate={[
                                        required({ message: 'Required' }),
                                        numericality({
                                            int: true,
                                            '>=': 1,
                                            message: 'Invalid entry.'
                                        })
                                    ]}
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col className="label-wrapper" xl={12} lg={12} xs={24}>
                        <Row>
                            <Col className="label-wrapper" xl={10} xs={24}>
                                <label className="input-title">Payment Date</label>
                            </Col>
                            <Col className="input-wrapper custom-funding-wrapper" xl={10} xs={24}>
                                <Field
                                    name={`${field}.${DEFICIT_CONTRIBUTION_DATE}`}
                                    className="form-control"
                                    component={DatePicker}
                                    options={{
                                        name: `${field}.${DEFICIT_CONTRIBUTION_DATE}`,
                                        disabledDate: current => current && current < moment().startOf('day')
                                    }}
                                    validate={[required({ message: 'Required' })]}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))}
            {error && <li className="error">{error}</li>}

            <div className="add-deficit-contributor-wrapper">
                <button
                    style={{ float: 'right' }}
                    type="button"
                    className="btn btn-blue-o btn-add-deficit-contributor regular btn-add-more cursor-pointer"
                    disabled={fields.length === 20}
                    onClick={() => {
                        fields.push();
                    }}
                >
                    + Add More
                </button>
            </div>
        </div>
    );
};

const DificitScreenContribution = props => {
    // const {
    //     dirtyFormValues: { formName }
    // } = props;
    // console.log(formName);

    //setting the field array propertise to check whether the array is empty
    const [formFields, setFormFields] = useState([]);
    const [formLength, setFormLength] = useState(null);

    //to append a filed to the array if its become empty
    useEffect(() => {
        if (!formLength) {
            formFields.push();
        }
    }, [formLength]);

    return (
        <div>
            <div className="label-wrapper">
                <label className="input-title funding-deficit-title">
                    Add up to 20 deficit contributions and associated payment dates:
                </label>
            </div>
            <div>
                <Row>
                    <FieldArray
                        name="screenDificitContribution"
                        component={renderDificitField}
                        setFormLength={setFormLength}
                        setFormFields={setFormFields}
                    />
                </Row>
            </div>
        </div>
    );
};

export default DificitScreenContribution;
