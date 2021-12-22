export const userPickerValidations = (dataset, skipDocuments, userType, role) => {
    let errors = {};
    for (const key in dataset.documents) {
        if (skipDocuments.includes(key)) continue;
        if (
            !dataset[userType] ||
            !dataset[userType][key] ||
            !dataset[userType][key][role] ||
            !dataset[userType][key][role].length
        ) {
            errors = { message: `Please select the list of ${userType} for the ${dataset.documents[key].title}.` };
            break;
        }
    }
    return errors;
};
