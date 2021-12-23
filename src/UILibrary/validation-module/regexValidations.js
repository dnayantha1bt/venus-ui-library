import _ from 'lodash';

const minMaxValidate = options => value => {
    const { min, max, message } = options;
    if (options.hasOwnProperty('max') && message && value && value > max) {
        return message;
    }
    if (options.hasOwnProperty('min') && message && value && value < min) {
        return message;
    }
    if (options.hasOwnProperty('min') && value && value < min) {
        return `Must be at least ${min}`;
    }

    if (options.hasOwnProperty('max') && value && value > max) {
        return `Must be lower than ${max}`;
    }
    return undefined;
};

const specialCharacterValidation = value => {
    if (/[!#$%^*()+\=\[\]{};:"\\|<>\/?]+/.test(value)) {
        return 'special characters are not allowed';
    }

    return undefined;
};

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z \d@$!%*#:?&]{8,}$/g;

const passwordStrength = value => {
    const criteria = [
        /\d/.test(value),
        /[A-Z]/.test(value),
        /[a-z]/.test(value),
        /[@$!%*#?&]/.test(value),
        /[A-Za-z\d@$!%*#?&]{8,}/.test(value)
    ];

    const criteriaLength = criteria.length;
    const passCount = _.compact(criteria).length;

    if (passCount <= 0) return ['', '', ''];

    const avg = passCount / criteriaLength;
    if (criteriaLength === passCount && avg === 1) return ['strong', 'strong', 'strong'];

    if (criteriaLength / 2 <= passCount && value.length >= 4) return ['medium', 'medium', ''];

    if (criteriaLength / 2 >= passCount) return ['weak', '', ''];

    return ['weak', '', ''];
};

const emailValidate = value =>
    value && !/^[a-z0-9\.]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

const requiredValidate = value => (value ? undefined : 'Required');

const numberValidate = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

const urlValidate = value => {
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    if (!value || value == '' || reg.test(value)) {
        return undefined;
    } else {
        return 'is not a valid url';
    }
};
export {
    passwordRegex,
    passwordStrength,
    emailValidate,
    requiredValidate,
    numberValidate,
    minMaxValidate,
    specialCharacterValidation,
    urlValidate
};
