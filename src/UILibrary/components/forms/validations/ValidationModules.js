import { required } from 'redux-form-validators';

export const ValidationModules = data => {
    const validate = [];
    data.map(v => {
        if (v.moduleName === 'REQUIRED') {
            validate.push(required({ message: 'Required' }));
        }
    });
    if (validate.length) {
        return validate;
    } else {
        return null;
    }
};
