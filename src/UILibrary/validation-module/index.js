import * as regexValidations from './regexValidations';
import { removeInvalidData } from './dataFormatValidations';
import { formFieldValidations } from './formFieldValidations';
import { JSONValidator } from './dataFormatValidations';

export default {
    ...regexValidations,
    removeInvalidData,
    formFieldValidations,
    JSONValidator
};
