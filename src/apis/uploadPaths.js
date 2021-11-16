module.exports = (liabilitiesFsKey, fundingFsKey) => ({
    rip: {
        cashflow: (schemeId, proposalName, key, timeStamp) =>
            `uploads/scheme/${schemeId}/${liabilitiesFsKey}/${timeStamp}/${key}`,
        deficitContribution: (schemeId, proposalName, key, timeStamp) =>
            `uploads/scheme/${schemeId}/${fundingFsKey}/${timeStamp}/${key}`
    }
});
