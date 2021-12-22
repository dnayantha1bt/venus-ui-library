import React from 'react';
import { required } from 'redux-form-validators';
import constants from '../../../UILibrary/constants';
import { Divider } from 'antd';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { FULL_CONTAINER, HALF_CONTAINER, ROW } = FORM_TEMPLATES;
const { INPUT_FIELD, DATE_PICKER } = FORM_FIELDS;

export const formFields = (props = {}) => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Input Field',
            field: {
                __order: 'a',
                name: 'activationCode',
                className: 'form-control',
                component: INPUT_FIELD,
                validate: [required({ message: 'Required' })]
            }
        },
        {
            type: ROW,
            rawComponents: <Divider type="horizontal" />
        },
        {
            type: HALF_CONTAINER,
            childComponents: [
                {
                    bool: true,
                    label: 'Input Field 1',
                    field: {
                        __order: 'a',
                        name: 'activationCode1',
                        className: 'form-control',
                        component: INPUT_FIELD,
                        validate: [required({ message: 'Required' })]
                    }
                },
                {
                    bool: true,
                    label: 'Input Field 2',
                    field: {
                        __order: 'a',
                        name: 'activationCode2',
                        className: 'form-control',
                        component: INPUT_FIELD,
                        validate: [required({ message: 'Required' })]
                    }
                }
            ]
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Input Field 2',
            field: {
                __order: 'a',
                name: 'activationCode5',
                className: 'form-control',
                component: DATE_PICKER,
                validate: [required({ message: 'Required' })]
            }
        }
    ];
};
