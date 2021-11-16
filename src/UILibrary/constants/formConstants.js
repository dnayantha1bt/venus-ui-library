/**
 * FORM GENERATOR TYPES
 *
 * if you need to create a new form with new features, you can create a new generator for it
 */
const GENERATE_FORMS_TYPE_SIMPLE = 'GENERATE_FORMS_TYPE_SIMPLE';
const GENERATE_FORMS_TYPE_WITH_CHILDREN = 'GENERATE_FORMS_TYPE_WITH_CHILDREN';

/**
 *  FORM SECTION GENERATOR TYPES
 *
 * if you need to create a new form with new sections, you can create a new generator for this section
 *
 */
const GENERATE_FORM_SECTION_TYPE_SIMPLE = 'GENERATE_FORM_SECTION_TYPE_SIMPLE';

/**
 *  FORM SECTION  TYPES
 *
 *
 */
const FORM_SECTION_INCLUDE_NEW = 'FORM_SECTION_INCLUDE_NEW';
const FORM_SECTION_INCLUDE_COMPONENT = 'FORM_SECTION_INCLUDE_COMPONENT';

/*
 FORM TYPES
 
 you need to use these constants to define which type of form you need to create
 */
const FORM_TYPE_SINGLE_PAGE = 'FORM_TYPE_SINGLE_PAGE';
const FORM_TYPE_WITH_TABS = 'FORM_TYPE_WITH_TABS';

const FORM_FIELDS = {
    INPUT_FIELD: 'INPUT_FIELD',
    ADDRESS_FIELD: 'ADDRESS_FIELD',
    AUTO_COMPLETE: 'AUTO_COMPLETE',
    NUMBER_FIELD: 'NUMBER_FIELD',
    CURRENCY_FIELD: 'CURRENCY_FIELD',
    SELECT_OPTION: 'SELECT_OPTION',
    BUTTON_GROUP: 'BUTTON_GROUP',
    DATE_PICKER: 'DATE_PICKER',
    FILE_UPLOADER: 'FILE_UPLOADER',
    FILE_DOWNLOADER: 'FILE_DOWNLOADER',
    TEXTAREA: 'TEXTAREA',
    MONTH_DATE_PICKER: 'MONTH_DATE_PICKER',
    ANT_INPUT_FIELD: 'ANT_INPUT_FIELD',
    MULTIPLE_FILE_UPLOADER: 'MULTIPLE_FILE_UPLOADER',
    PHONE_NUMBER_FIELD: 'PHONE_NUMBER_FIELD',

    ASSETS_VALUE_SEPARATOR: 'ASSETS_VALUE_SEPARATOR',
    NON_ASSETS_SECTION: 'NON_ASSETS_SECTION',
    DEFICIT_CONTRIBUTION_SECTION: 'DEFICIT_CONTRIBUTION_SECTION'
};

const FORM_TEMPLATES = {
    ROW: 'row',
    COL: 'col',
    DIV: 'div',
    FIELD: 'field',
    LABEL: 'label',
    FULL_CONTAINER: 'full_container',
    HALF_CONTAINER: 'half_container',
    ADD_MORE_CONTAINER: 'add_more_container',
    PUBLISH_CHECKBOX: 'publish_checkbox',
    PUBLISH_MULTI_CHECKBOX_CONTAINER: 'publish_multi_checkbox_container',
    FULL_VIEW_CONTAINER: 'full_view_container'
};

const FORM_ACTION_TYPES = {
    SAVE: 'save',
    SAVE_PROFILE: 'Save',
    SUBMIT: 'submit',
    APPROVE: 'approve',
    REJECT: 'reject',
    ADD: 'add new users',
    ADD_GROUP: 'add new group',
    PUBLISH: 'publish',
    DOWNLOAD: 'download',
    REQUEST: 'Request',
    REQUESTIAA: 'Request IAA',
    CREATE_USER: 'Create user',
    CREATE_GROUP: 'Create group',
    UPDATE: 'Update',
    ACTIVATE: 'Activate',
    CONTINUE: 'Continue',
    DELETE: 'Delete',
    DELETE_ACCOUNT: 'Send delete request',
    PORTFOLIO: 'portfolio analyzer'
};

export {
    GENERATE_FORMS_TYPE_SIMPLE,
    GENERATE_FORMS_TYPE_WITH_CHILDREN,
    GENERATE_FORM_SECTION_TYPE_SIMPLE,
    FORM_SECTION_INCLUDE_NEW,
    FORM_SECTION_INCLUDE_COMPONENT,
    FORM_TYPE_SINGLE_PAGE,
    FORM_TYPE_WITH_TABS,
    FORM_FIELDS,
    FORM_TEMPLATES,
    FORM_ACTION_TYPES
};
