import constants from "../../../UILibrary/constants";

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { FULL_CONTAINER } = FORM_TEMPLATES;
const {
  INPUT_FIELD
} = FORM_FIELDS;

export const formFields = (props = {}) => {
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
  }
  ];
};
