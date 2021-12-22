import { addValidator } from 'redux-form-validators';

export const decimalValidator = addValidator({
    validator: function(options, value, allValues) {
        if (value.includes('.') && options && options.decimalCount) {
            const decimalPart = value.split('.');

            // at least

            // if (decimalPart[1].length < options.decimalCount) {
            //     return {
            //         id: 'form.errors.custom',
            //         defaultMessage: options.message
            //             ? options.message
            //             : `must contain at least  ${options.decimalCount} decimal points`,
            //         values: { count: options.decimalCount }
            //     };
            // } else {
            //     return undefined;
            // }

            // maximum

            // if (decimalPart[1].length > options.decimalCount) {
            //     return {
            //         id: 'form.errors.custom',
            //         defaultMessage: options.message
            //             ? options.message
            //             : `allows only ${options.decimalCount} decimal points `,
            //         values: { count: options.decimalCount }
            //     };
            // } else {
            //     if (decimalPart[1].length === 0) {
            //         return {
            //             id: 'form.errors.custom',
            //             defaultMessage: `must be a decimal value`
            //         };
            //     }
            //     return undefined;
            // }

            // exact
            if (decimalPart[1].length !== options.decimalCount) {
                return {
                    id: 'form.errors.alpha',
                    defaultMessage: options.message
                        ? options.message
                        : `must contain  ${options.decimalCount} decimal point`,
                    values: { count: options.decimalCount }
                };
            } else {
                return undefined;
            }
            //
        } else {
            if (!options.decimalCount) {
                return {
                    id: 'form.errors.custom',
                    defaultMessage: `should pass a decimalCount options to the DecimalValidate`
                };
            }
            return {
                id: 'form.errors.custom',
                defaultMessage: `must type a decimal number`
            };
        }
    }
});
