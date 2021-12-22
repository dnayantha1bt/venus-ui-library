import { addValidator } from 'redux-form-validators';

export const decimalValidator = addValidator({
    validator: function(options, value, allValues) {
        if (value.includes('.') && options && options.precision) {
            const decimalPart = value.split('.');

            // at least

            // if (decimalPart[1].length < options.precision) {
            //     return {
            //         id: 'form.errors.custom',
            //         defaultMessage: options.message
            //             ? options.message
            //             : `must contain at least  ${options.precision} decimal points`,
            //         values: { count: options.precision }
            //     };
            // } else {
            //     return undefined;
            // }

            // maximum

            if (decimalPart[1].length > options.precision) {
                return {
                    id: 'form.errors.custom',
                    defaultMessage: options.message
                        ? options.message
                        : `allows maximum ${options.precision} decimal points `,
                    values: { count: options.precision }
                };
            } else {
                if (decimalPart[1].length === 0) {
                    return {
                        id: 'form.errors.custom',
                        defaultMessage: `must be a decimal value`
                    };
                }
                return undefined;
            }

            // exact
            // if (decimalPart[1].length !== options.precision) {
            //     return {
            //         id: 'form.errors.alpha',
            //         defaultMessage: options.message
            //             ? options.message
            //             : `must contain  ${options.precision} decimal point`,
            //         values: { count: options.precision }
            //     };
            // } else {
            //     return undefined;
            // }
            //
        } else {
            if (!options.precision) {
                return {
                    id: 'form.errors.custom',
                    defaultMessage: `should pass a precision options to the DecimalValidate`
                };
            }
            return {
                id: 'form.errors.custom',
                defaultMessage: `must type a decimal number`
            };
        }
    }
});
