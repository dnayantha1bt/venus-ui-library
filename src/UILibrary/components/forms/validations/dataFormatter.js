import { validateDataSet } from '../formBase/FormBase';
export const removeInvalidData = (formData, formFieldData, formFieldFunction) => {
    let data = {};
    if (formFieldData) {
        data = validateDataSet(formData, formFieldData);
    } else if (formFieldFunction) {
        data = validateDataSet(formData, formFieldFunction(formData));
    }
    return data;
};
