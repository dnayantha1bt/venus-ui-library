import { validateDataSet } from '../components/forms/formBase/FormBase';
// import NotificationHelper from '../helpers/NotificationHelper';

export function JSONValidator(json) {
    if (Array.isArray(json)) {
        const all = json.every(element => {
            return toString.call(element) === '[object Object]';
        });
        if (all) {
            return true;
        } else {
            throw new Error('Pass a valid json configuration to create the form ');
        }
    }

    if (toString.call(json) === '[object Object]') {
        return true;
    }
    throw new Error('Pass a valid json configuration to create the form ');
}

export function FunctionalValidator(func) {
    if (toString.call(func) === '[object Function]') {
        return true;
    }
    throw new Error('Pass a valid functional configuration to create the form ');
}

export const removeInvalidData = (formData, formFieldData, formFieldFunction) => {
    let data = {};
    if (formFieldData) {
        data = validateDataSet(formData, formFieldData);
    } else if (formFieldFunction) {
        data = validateDataSet(formData, formFieldFunction(formData));
    }
    return data;
};
