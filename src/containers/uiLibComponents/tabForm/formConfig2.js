import constants from '../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { FULL_VIEW_CONTAINER } = FORM_TEMPLATES;
const { ADDRESS_FIELD } = FORM_FIELDS;

export const formFields2 = (props = {}) => {
    return [
        {
            type: FULL_VIEW_CONTAINER,
            bool: true,
            field: {
                name: 'addressField',
                __order: 'd',
                className: 'form-control',
                component: ADDRESS_FIELD,
                options: {
                    title: 'Address of trustees for correspondence'
                }
            }
        }
    ];
};
