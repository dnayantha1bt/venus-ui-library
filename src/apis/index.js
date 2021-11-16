import axios from 'axios';

const fmDomain = 'https://gclr72tpkk.execute-api.eu-west-2.amazonaws.com';
const generateDomain = 'https://gclr72tpkk.execute-api.eu-west-2.amazonaws.com';
const prefix = '/dev/tpip';
const fmVersion = '/v1';
const generateVersion = '/v1';

const getIdToken = () => {
    return { Authorization: 'jwtToken' }; // add token here
};

const connectApi = {
    convertDocumentRequest: data => {
        return axios.post(
            `${generateDomain}${prefix}${generateVersion}/docx-to-pdf`,
            { ...data },
            { headers: getIdToken() }
        );
    },
    getUploadUrl: data => {
        return axios.post(`${fmDomain}${prefix}${fmVersion}/file-manager/fetch/signed/put-url`, data, {
            headers: getIdToken()
        });
    },
    uploadFile: ({ url, file }) => {
        let options = {
            headers: {
                'Content-Type': file.type
            }
        };
        return axios.put(url, file, options);
    },
    getGeneratedDocumentRequest: data => {
        return axios.post(
            `${generateDomain}${prefix}${generateVersion}/generate-docx`,
            { ...data },
            { headers: getIdToken() }
        );
    },

};

export default connectApi;