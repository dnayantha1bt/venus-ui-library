import React from 'react';
import { Field } from 'redux-form';

import InputField from './InputField';
import PhoneNumberField from './PhoneNumberField';
import AntInputField from './AntInputField';
import CheckboxField from './CheckBoxField';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import NumberField from './NumberField';
import CurrencyField from './CurrencyField';
import TextArea from './TextArea';
import PasswordVisibileField from './PasswordVisibleField';
import PasswordField from './PasswordField';
import ButtonGroup from './ButtonGroup';
import ReCAPTCHA from './ReCAPTCHA';
import DatePicker from './DatePicker';
import MonthDatePicker from './MonthDatePicker';

import AddressField from './AddressField';
import DificitScreenContribution from './DificitContribution';
import NonAssetsSection from './NonAssetsSection';
import SelectOptions from './SelectOptions';
import AssetsValueSeparator from './AssetsValueSeparator';
import AutoComplete from './AutoComplete';
import FileUploader from './FileUploader';
import MultipleFileUploader from './FileUploader';
import FileDownloader from './FileDownloader';
import GenerateDownloader from './GenerateDownloader';

import constants from '../../../constants';

const { FORM_FIELDS } = constants;
const {
    ADDRESS_FIELD,
    INPUT_FIELD,
    AUTO_COMPLETE,
    NUMBER_FIELD,
    CURRENCY_FIELD,
    SELECT_OPTION,
    BUTTON_GROUP,
    DATE_PICKER,
    FILE_UPLOADER,
    FILE_DOWNLOADER,
    TEXTAREA,
    MONTH_DATE_PICKER,
    ANT_INPUT_FIELD,
    MULTIPLE_FILE_UPLOADER,
    PHONE_NUMBER_FIELD,
    ASSETS_VALUE_SEPARATOR,
    NON_ASSETS_SECTION,
    DEFICIT_CONTRIBUTION_SECTION
} = FORM_FIELDS;

const formComponents = {
    [INPUT_FIELD]: InputField,
    [AUTO_COMPLETE]: AutoComplete,
    [NUMBER_FIELD]: NumberField,
    [CURRENCY_FIELD]: CurrencyField,
    [SELECT_OPTION]: SelectOptions,
    [BUTTON_GROUP]: ButtonGroup,
    [DATE_PICKER]: DatePicker,
    [FILE_UPLOADER]: FileUploader,
    [FILE_DOWNLOADER]: FileDownloader,
    [TEXTAREA]: TextArea,
    [MONTH_DATE_PICKER]: MonthDatePicker,
    [ANT_INPUT_FIELD]: AntInputField,
    [MULTIPLE_FILE_UPLOADER]: MultipleFileUploader,
    [PHONE_NUMBER_FIELD]: PhoneNumberField,
    [ASSETS_VALUE_SEPARATOR]: AssetsValueSeparator,
    [NON_ASSETS_SECTION]: NonAssetsSection,
    [ADDRESS_FIELD]: AddressField,
    [DEFICIT_CONTRIBUTION_SECTION]: DificitScreenContribution
};

const formatInputData = value => {
    if (value === '') {
        return null;
    }

    return value;
};

export const FormField = ({ component, disabled, ...props }) => {
    const c = formComponents[component];
    return (
        <Field
            normalize={formatInputData}
            {...props}
            disabled={typeof disabled !== 'undefined' ? disabled : props.disabled}
            component={c}
        />
    );
};

export {
    InputField,
    PhoneNumberField,
    AntInputField,
    CheckboxField,
    CheckboxGroup,
    NumberField,
    CurrencyField,
    TextArea,
    PasswordVisibileField,
    PasswordField,
    ButtonGroup,
    ReCAPTCHA,
    DatePicker,
    MonthDatePicker,
    GenerateDownloader,
    FileDownloader
};