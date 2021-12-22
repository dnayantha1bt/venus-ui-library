export const userPickerValidations = (dataset, skipDocument, userType) => {
    let errors = {};
    for (const key in dataset.documents) {
        if (key === skipDocument) continue;
        if (
            !dataset[userType] ||
            !dataset[userType][key] ||
            !dataset[userType][key].admin ||
            !dataset[userType][key].admin.length
        ) {
            errors = { message: `Please select the list of ${userType} for the ${dataset.documents[key].title}.` };
            break;
        }
    }
    return errors;
};
