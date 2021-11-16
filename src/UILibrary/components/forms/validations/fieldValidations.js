import _ from 'lodash';

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z \d@$!%*#:?&]{8,}$/g;
const passwordStrength = value => {
    const criteria = [
        /\d/.test(value),
        /[A-Z]/.test(value),
        /[a-z]/.test(value),
        /[@$!%*#?&]/.test(value),
        /[A-Za-z\d@$!%*#?&]{8,}/.test(value)
    ];

    const criteriaLength = criteria.length;
    const passCount = _.compact(criteria).length;

    if (passCount <= 0) return ['', '', ''];

    const avg = passCount / criteriaLength;
    if (criteriaLength === passCount && avg === 1) return ['strong', 'strong', 'strong'];

    if (criteriaLength / 2 <= passCount && value.length >= 4) return ['medium', 'medium', ''];

    if (criteriaLength / 2 >= passCount) return ['weak', '', ''];

    return ['weak', '', ''];
};

export { passwordRegex, passwordStrength };
