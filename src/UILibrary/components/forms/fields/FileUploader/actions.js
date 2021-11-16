import {
    GET_SIGN_URL_IN_PROGRESS,
    GET_SIGN_URL_SUCCESS,
    UPLOAD_TO_S3_BUCKET_IN_PROGRESS,
    UPLOAD_TO_S3_BUCKET_SUCCESS,
    GET_GENERATED_URL_IN_PROGRESS,
    GET_GENERATED_URL_SUCCESS
} from './constants';

export const getSignUrlInProgress = () => {
    return {
        type: GET_SIGN_URL_IN_PROGRESS
    };
};

export const getSignUrlSuccess = () => {
    return {
        type: GET_SIGN_URL_SUCCESS
    };
};

export const uploadTOS3BucketInProgress = () => {
    return {
        type: UPLOAD_TO_S3_BUCKET_IN_PROGRESS
    };
};

export const uploadTOS3BucketSuccess = () => {
    return {
        type: UPLOAD_TO_S3_BUCKET_SUCCESS
    };
};

export const getGeneratedUrlInProgress = () => {
    return {
        type: GET_GENERATED_URL_IN_PROGRESS
    };
};

export const getGeneratedUrlSuccess = () => {
    return {
        type: GET_GENERATED_URL_SUCCESS
    };
};
