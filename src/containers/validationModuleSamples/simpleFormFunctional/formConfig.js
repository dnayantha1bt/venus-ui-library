import React from 'react';
import BaseTemplate from '../../../UILibrary/components/forms/formBase/FormBase';
import constants from '../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { INPUT_FIELD, DATE_PICKER } = FORM_FIELDS;
const { FULL_CONTAINER, HALF_CONTAINER, ADD_MORE_CONTAINER } = FORM_TEMPLATES;

const addmoreForm = namePrefix => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Add More Required Validate',
            field: {
                name: `${namePrefix}.requredvalidate`,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    }
                ]
            }
        }
    ];
};

export const formFields = props => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Required Validate',
            field: {
                name: `requiredvalidate`,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Email Validate',
            field: {
                name: `emailvalidate`,
                className: 'form-control',
                component: INPUT_FIELD,
                isEmail: true,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    },
                    {
                        moduleName: 'EmailValidate'
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Number Validate',
            field: {
                name: `numbervalidate`,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    },
                    {
                        moduleName: 'NumberValidate'
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Greater Than Zero Validate',
            field: {
                name: `greaterthanzerocalidate`,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    },
                    {
                        moduleName: 'GreaterThanZeroValidate'
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Numerical Validate',
            field: {
                name: `numericalvalidate`,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    },
                    {
                        moduleName: 'NumericalValidate',
                        options: {
                            otherThan: 10.05
                        }
                    },
                    {
                        moduleName: 'NumericalValidate',
                        options: {
                            otherThan: 12.55
                        }
                    },
                    {
                        moduleName: 'DecimalValidate',
                        options: {
                            precision: 2
                        }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Date Validate',
            field: {
                name: 'DateValidate',
                className: 'form-control',
                component: INPUT_FIELD,
                options: {
                    ignoreCharacterValidation: true
                },
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    },
                    {
                        moduleName: 'DateValidate',
                        options: {
                            format: 'dd/mm/yyyy'
                        }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Length Validate',
            field: {
                name: 'LengthValidate',
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    },
                    {
                        moduleName: 'LengthValidate',
                        options: {
                            // min: 3
                            in: [3, 5]
                            //is:5
                        }
                    }
                ]
            }
        },
        {
            type: HALF_CONTAINER,
            bool: true,
            childComponents: [
                {
                    type: FULL_CONTAINER,
                    bool: true,
                    label: 'ConfirmationValidate1',
                    field: {
                        name: 'ConfirmationValidate1',
                        className: 'form-control',
                        component: INPUT_FIELD,
                        validationModules: [
                            {
                                moduleName: 'RequiredValidate'
                            }
                        ]
                    }
                },
                {
                    type: FULL_CONTAINER,
                    bool: true,
                    label: 'ConfirmationValidate2',
                    field: {
                        name: 'ConfirmationValidate2',
                        className: 'form-control',
                        component: INPUT_FIELD,
                        validationModules: [
                            {
                                moduleName: 'RequiredValidate'
                            },
                            {
                                moduleName: 'ConfirmationValidate',
                                options: {
                                    field: 'ConfirmationValidate1',
                                    fieldLabel: 'ConfirmationValidate1'
                                }
                            }
                        ]
                    }
                }
            ]
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'string only Validate',
            field: {
                name: 'FormatValidate',
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    },
                    {
                        moduleName: 'StringValidate'
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Includes Validate',
            field: {
                name: 'IncludesValidate',
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    },
                    {
                        moduleName: 'IncludesValidate',
                        options: {
                            in: ['red', 'green'],
                            message: 'not included in the list'
                        }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Exclude Validate',
            field: {
                name: 'ExcludeValidate',
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    },
                    {
                        moduleName: 'ExcludeVaidate',
                        options: {
                            in: ['apple', 'banana'],
                            message: 'is excluded'
                        }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Url Validate',
            field: {
                name: 'UrlValidate',
                className: 'form-control',
                component: INPUT_FIELD,
                options: {
                    ignoreCharacterValidation: true
                },
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    },
                    {
                        moduleName: 'UrlValidate'
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Special Character Validate',
            field: {
                name: 'SpecialCharacterValidate',
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    },
                    {
                        moduleName: 'SpecialCharacterValidate'
                    }
                ]
            }
        },

        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Format Validate',
            field: {
                name: 'formatValidation',
                className: 'form-control',
                component: INPUT_FIELD,
                options: {
                    ignoreCharacterValidation: true
                },
                validationModules: [
                    {
                        moduleName: 'FormatValidate',
                        options: {
                            without: /^((?!word).)*$/gm, // value can't contain  word
                            message: `value has to contain word`
                        }
                    }
                ]
            }
        },
        {
            type: ADD_MORE_CONTAINER,
            bool: true,
            title: 'Add More Container ',
            titleClass: 'pb-4',
            name: 'addmore',
            border: true,
            maxLimit: 100,
            repeatTimes: 1,
            divider: true,
            showRemoveButton: true,
            addMoreButtonVisible: true,
            completed: false,
            addMoreButtonText: '+ Add more',
            repeatingComponent: namePrefix => <BaseTemplate data={addmoreForm(namePrefix)} disabled={false} />
        },
        {
            type: FULL_CONTAINER,
            bool: false,
            label: 'removeInvalidData',
            field: {
                name: 'removeInvalidData',
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    }
                ]
            }
        }
    ];
};
