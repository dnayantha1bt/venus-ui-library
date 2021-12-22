import constants from '../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { FULL_CONTAINER } = FORM_TEMPLATES;
const { FILE_UPLOADER } = FORM_FIELDS;

const deficitContribution = (schemeId, proposalName, key, timeStamp) => `uploads/scheme`

export const formFields = (props = { props }) => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'sample csv',
            field: {
                __order: 'c',
                name: 'sampleCsv',
                className: 'form-control',
                component: FILE_UPLOADER,
                options: {
                    accept: '.pdf',
                    manual: true,
                    api: props.api,
                    // block: dirtyFormValues.screen === 'reqip',
                    block: false,
                    bucketName: 'tpip-venus-dev-upload',
                    url: e => deficitContribution(e),
                    // params: [props.schemeId, 'data[PROPOSAL_NAME]']

                    params: ['12345', 'name']
                }
            }
        }
    ];
};
