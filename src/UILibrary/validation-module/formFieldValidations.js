
import {
    required,
    email,
    date,
    length,
    confirmation,
    format,
    inclusion,
    exclusion,
    url,
    file,
    numericality
} from './form-field-validator-impl'
import constants from '../constants';
import NotificationHelper from '../helpers/NotificationHelper';
import { specialCharacterValidation, urlValidate, emailValidate } from './regexValidations';
import { decimalValidator } from './customValidators';

const { GREATER_THAN_ZERO_MESSAGE } = constants;

const validations = {
    RequiredValidate: v => {
        if (v.options) {
            return required({ ...v.options });
        }
        return required();
    },
    EmailValidate: v => {
        if (v.options) {
            return email({ ...v.options });
        }

        return emailValidate;
    },
    NumberValidate: () => numericality({ int: true }),
    GreaterThanZeroValidate: () => numericality({ '>': 0, message: GREATER_THAN_ZERO_MESSAGE }),
    NumericalValidate: v => {
        if (v.options) {
            return numericality({
                ...v.options
            });
        }

        return numericality({ int: true });
    },
    DateValidate: v => {
        if (v.options) {
            return date({ ...v.options });
        }

        return date({ format: 'mm/dd/yyyy' });
    },
    LengthValidate: v => {
        if (v.options) {
            return length({ ...v.options });
        }
    },
    ConfirmationValidate: v => {
        if (v.options) {
            return confirmation({ ...v.options });
        }

        return;
    },
    SpecialCharacterValidate: v => {
        return specialCharacterValidation;
    },
    StringValidate: v => {
        return format({ with: '^[A-Za-z\\s]+$', message: 'Only allows letters' });
    },
    IncludesValidate: v => {
        if (v.options) {
            return inclusion({ ...v.options });
        }
    },
    ExcludeVaidate: v => {
        if (v.options) {
            return exclusion({ ...v.options });
        }
    },

    UrlValidate: v => {
        if (v.options) {
            return url({ ...v.options });
        }
        return urlValidate;
    },

    FileValidate: v => {
        if (v.options) {
            return file({ ...v.options });
        }
    },
    FormatValidate: v => {
        if (v.options) {
            return format({ ...v.options });
        }
        return;
    },
    DecimalValidate: v => {
        if (v.options) {
            return decimalValidator({ ...v.options });
        }
        return;
    }
};
export const formFieldValidations = data => {
    const validate = [];
    data.map(v => {
        if (validations[v.moduleName]) {
            validate.push(validations[v.moduleName](v));
        } else {
            NotificationHelper.getInstance().error(
                `There is no such validation called "${v.moduleName}" in the module`
            );
            console.error(`There is no such validation called "${v.moduleName}" in the module`);

            throw new Error(
                `There is no such validation called "${v.moduleName}" in the module \n check your form configuration`
            );
        }
    });
    if (validate.length) {
        return validate;
    } else {
        return null;
    }
};
