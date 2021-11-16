import React, { Component } from 'react';
import { Upload as AntUpload } from 'antd';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';

// import api from '../../../../../../middlewares/connectApi';

import FileDownloader from '../FileDownloader';
import CustomLoader from '../../../progressLoader';
import NotificationHelper from '../../../../helpers/NotificationHelper';
import constants from '../../../../constants';
import {
    getSignUrlInProgress,
    getSignUrlSuccess,
    uploadTOS3BucketInProgress,
    uploadTOS3BucketSuccess
} from './actions';

import store from '../../../../../redux/store';
// import AwsIotSingleton from '../../../../../../helpers/awsIot';

const { INVALID_FILE_FORMAT, INVALID_FILE_SIZE, FILE_ALREADY_UPLOADED } = constants;

/**
 * @props
 * options: bucketName
 * generateoptions: loggedUser
 */

export default class FileUploader extends Component {
    state = {
        inProgress: false,
        generate_inProgress: false,
        status: null,
        socketData: null
    };

    generationSocket(topic, rest) {
        const { input } = this.props;
        const { filePath } = rest;

        // AwsIotSingleton.getPayloadFromSocket(topic, data =>
        //     this.setState({ socketData: { ...data }, generate_inProgress: false }, () => {
        //         if (
        //             data &&
        //             data.payload &&
        //             data.payload.complete &&
        //             data.payload.docData &&
        //             data.payload.docData.generatedDocxFileName &&
        //             data.payload.docData.location &&
        //             `${data.payload.docData.location}/${data.payload.docData.generatedDocxFileName}` === filePath
        //         ) {
        //             input.onChange(filePath, true);
        //             this.unsubscribeSocket(topic);
        //             this.convertDocument(rest);
        //         } else if (data && data.payload && !data.payload.complete) {
        //             this.unsubscribeSocket(topic);
        //         }
        //     })
        // );
    }

    unsubscribeSocket(topic) {
        this.setState({ generate_inProgress: false }, () => {
            // AwsIotSingleton.unsubscribeSocket(topic);
        });
    }

    async convertDocument(data) {
        const { privateBucketName, dstFilePath, key, tenant, templateKey } = data;
        try {
            // await api.convertDocumentRequest({
            //     tenant,
            //     s3bucketurl: privateBucketName,
            //     s3pathurl: dstFilePath,
            //     fileName: key,
            //     suffixFileName: templateKey === 'pmcProposal' ? 'pmc_1' : undefined
            // });
        } catch (error) {}
    }

    async handleUpload(file) {
        const { input, options } = this.props;

        let key = null;

        const timeStamp = uuidv1();
        this.setState({ inProgress: true });
        if (options.isprofileImage) {
            options.handleState();
        }

        if (options.changeFileName) {
            key = `${options.changeFileName}`;
        } else {
            key = file.name ? file.name.trim().replace(/ /g, '__') : '';
        }

        const filePath = options.url(...options.params, key, timeStamp);
        const bucketName = options.bucketName;
        try {
            store.dispatch(getSignUrlInProgress());
            // const { data } = await api.getUploadUrl({ bucketName, filePath });
            const { data } = {} // change

            store.dispatch(getSignUrlSuccess());
            store.dispatch(uploadTOS3BucketInProgress());
            const url = data.content.url;

            // await api.uploadFile({ file, url });
            store.dispatch(uploadTOS3BucketSuccess());

            this.setState({ inProgress: false, status: 'success' }, () => {
                input.onChange(filePath);
            });
        } catch (error) {
            this.setState({ inProgress: false, status: 'error' }, () => {
                input.onChange(null);
            });
        }
    }

    async handleGenerate(file) {
        const timeStamp = uuidv1();

        const { generateoptions = {}, input, options } = this.props;
        const {
            step,
            flowKey,
            schemeId,
            tenant,
            docName,
            templateKey,
            draftKey,
            dataKey,
            suffixFileName = undefined,
            loggedUser,
            ...rest
        } = generateoptions;

        try {
            if (step && flowKey && schemeId) {
                this.setState({ generate_inProgress: true });

                const key = `${docName.toLowerCase()}_generate_${schemeId}_${timeStamp}.docx`;
                const dstPdfFilename = `${docName.toLowerCase()}_generate_${schemeId}_${timeStamp}.pdf`;

                const filePath = options.url(...options.params, key, timeStamp);
                const dstFilePath = filePath.split(`/${key}`)[0];

                const topic = `/notification/generation/${schemeId}/${flowKey}/${step}/${templateKey}/${loggedUser.userId}`;

                try {
                    this.generationSocket(topic, {
                        filePath,
                        privateBucketName: options.bucketName,
                        dstFilePath,
                        key,
                        tenant,
                        userId: loggedUser.userId,
                        templateKey
                    });
                } catch (error) {}

                // const { data } = await api.getGeneratedDocumentRequest({
                //     dstBucketName: options.bucketName,
                //     dstFilePath,
                //     dstDocxFilename: key,
                //     dstPdfFilename,
                //     schemeId,
                //     step,
                //     flowKey,
                //     tenant,
                //     templateKey,
                //     draftKey,
                //     dataKey,
                //     rest
                // });

                const { data } = {} // change

                if (
                    data &&
                    data.content &&
                    data.content.generatedDocxFileName &&
                    data.content.location &&
                    `${data.content.location}/${data.content.generatedDocxFileName}` === filePath
                ) {
                    input.onChange(filePath, true);
                }

                this.setState({ generate_inProgress: false });
            } else {
                this.setState({ generate_inProgress: false });
                NotificationHelper.getInstance().error('Unexpected error. Please refresh browser and try again.');
            }
        } catch (error) {
            if (_.get(error, 'response.data.message') === 'Endpoint request timed out') {
            } else if (_.get(error, 'response.status') === 505) {
                this.setState({ generate_inProgress: false });
                // const errorObj = getError(error, 'An error occurred while generating the document. Please try again.');
                // NotificationHelper.getInstance().warning(errorObj.message);
                NotificationHelper.getInstance().warning(
                    'An error occurred while generating the document. Please try again.'
                );
            } else {
                this.setState({ generate_inProgress: false });
                // const errorObj = getError(error, 'An error occurred while generating the document. Please try again.');
                // NotificationHelper.getInstance().error(errorObj.message);
                NotificationHelper.getInstance().error(
                    'An error occurred while generating the document. Please try again.'
                );
            }
        }
    }

    async removeFile(key) {
        const { input } = this.props;
        try {
            this.setState({ status: null }, () => {
                input.onChange(null);
            });
        } catch (error) {}
    }

    render() {
        const { inProgress, status, generate_inProgress } = this.state;
        const {
            input,
            meta: { touched, error },
            options,
            generate,
            generateoptions,
            ...rest
        } = this.props;

        let hasError = touched && error !== undefined;

        const uploadProps = {
            showUploadList: false,
            beforeUpload: file => {
                // if (options && options.manual && options.block) {
                //   NotificationHelper.getInstance().error(NO_PROPOSAL_NAME_MESSAGE);
                // } else {

                if (rest.onClick) rest.onClick(false);
                if (
                    (options.accept &&
                        options.accept.length &&
                        (options.accept.includes(
                            `.${file.name
                                .split('.')
                                .pop()
                                .toUpperCase()}`
                        ) ||
                            options.accept.includes(
                                `.${file.name
                                    .split('.')
                                    .pop()
                                    .toLowerCase()}`
                            ))) ||
                    (!Array.isArray(options.accept) &&
                        (file.name
                            .split('.')
                            .pop()
                            .toUpperCase() === options.accept.split('.').pop() ||
                            file.name
                                .split('.')
                                .pop()
                                .toLowerCase() === options.accept.split('.').pop()))
                ) {
                    const fileSize = file.size / 1000000;
                    if (fileSize > 11) {
                        NotificationHelper.getInstance().error(INVALID_FILE_SIZE);
                        this.setState({ inProgress: false });
                    } else {
                        this.handleUpload(file);
                        return false;
                    }
                } else {
                    if (options.errorMessage) {
                        NotificationHelper.getInstance().error(options.errorMessage);
                    } else {
                        NotificationHelper.getInstance().error(
                            'Please re-submit document in ' + options.accept + ' format.'
                        );
                    }

                    this.setState({ inProgress: false });
                }
                //}

                return false;
            },
            ...options
        };

        return (
            <div className={`${generate ? 'buttons-holder' : 'field-wrapper'}`}>
                {generate_inProgress ? (
                    <CustomLoader timeDuration={generateoptions && generateoptions.time ? generateoptions.time : 28} />
                ) : null}
                <div className="field-wrapper">
                    <input type="text" {...input} {...rest} hidden={true} />
                    <AntUpload
                        {...uploadProps}
                        disabled={
                            rest.disabled ||
                            (options && options.disabled) ||
                            inProgress ||
                            rest.disableduploadonly ||
                            generate_inProgress
                        }
                    >
                        <button
                            className={`tpip-btn-blue regular btn-upload ${
                                rest.disabled || (options && options.disabled) || inProgress || rest.disableduploadonly
                                    ? 'cursor-default'
                                    : 'cursor-pointer'
                            }`}
                            title={rest.title}
                            type="button"
                            disabled={rest.disabled}
                        >
                            {inProgress ? (
                                <>
                                    <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                                    <span className="btn-text">Uploading...</span>
                                </>
                            ) : (
                                <>
                                    <i className="fa fa-upload" aria-hidden="true"></i>
                                    <span className="btn-text">
                                        {options.displayName ? options.displayName : 'Upload'}
                                    </span>
                                </>
                            )}
                        </button>
                    </AntUpload>
                    {input.value && !options.notDownloadBtn && (
                        <div className={`resource-wrapper ${status ? status : 'success'}`}>
                            <div className="left-wrap pull-left">
                                <FileDownloader
                                    type="resource"
                                    fileName={options.name}
                                    url={input.value}
                                    isPublic={options.isPublic}
                                />
                            </div>
                            {!rest.disabled && (
                                <div className="right-wrap pull-right">
                                    <i
                                        className="fa fa-times fa-icon"
                                        aria-hidden="true"
                                        onClick={() => {
                                            this.removeFile(input.value);
                                        }}
                                    ></i>
                                </div>
                            )}
                        </div>
                    )}
                    {hasError && <span className="error">{error}</span>}
                </div>
                {generate && (
                    <button
                        className={`btn ${
                            generate && (generateoptions && !generateoptions.disabled)
                                ? `btn-generate-enabled btn-upload`
                                : `btn-generate`
                        }`}
                        type="button"
                        onClick={() => {
                            if (!generate_inProgress && !inProgress) this.handleGenerate();
                            if (rest.onClick) rest.onClick(true);
                        }}
                        disabled={!generate || (!generateoptions || (generateoptions && generateoptions.disabled))}
                    >
                        {generate_inProgress ? (
                            <>
                                <i className="fa fa-circle-o-notch fa-spin" /> Generating...
                            </>
                        ) : (
                            <>
                                <i className="fa fa-cog icon" /> Generate
                            </>
                        )}
                    </button>
                )}
            </div>
        );
    }
}

export class MultipleFileUploader extends FileUploader {
    state = {
        inProgress: false,
        status: null
    };

    async handleUpload(file) {
        const { input, options } = this.props;
        this.setState({ inProgress: true });

        let datam = input.value && input.value !== '' ? JSON.parse(input.value) : [];

        const key = file.name ? file.name.trim().replace(/ /g, '__') : '';
        const timeStamp = uuidv1();
        const filePath = options.url(...options.params, key, timeStamp);
        const bucketName = options.bucketName;

        try {
            // const { data } = await api.getUploadUrl({ bucketName, filePath });
            const { data } = {} // change
            const url = data.content.url;
            // await api.uploadFile({ file, url });

            this.setState({ inProgress: false, status: 'success' }, () => {
                datam.push({ url: filePath, uid: file.uid });
                input.onChange(JSON.stringify(datam));
            });
        } catch (error) {
            this.setState({ inProgress: false, status: 'error' }, () => {
                input.onChange(null);
            });
        }
    }

    async removeFile(key) {
        const { input } = this.props;
        let data = JSON.parse(input.value);

        try {
            this.setState({ status: null }, () => {
                data.splice(key, 1);
                input.onChange(JSON.stringify(data));
            });
        } catch (error) {}
    }

    render() {
        const { inProgress, status } = this.state;
        const {
            input,
            meta: { touched, error },
            options,
            ...rest
        } = this.props;
        let hasError = touched && error !== undefined;

        const dataTemp = input.value && input.value !== '' ? JSON.parse(input.value) : [];
        const uploadProps = {
            showUploadList: false,
            beforeUpload: file => {
                if (rest.onClick) rest.onClick(false);
                if (dataTemp.find(x => x.url.split('/').pop() === file.name.trim().replace(/ /g, '__'))) {
                    NotificationHelper.getInstance().error(FILE_ALREADY_UPLOADED);
                    this.setState({ inProgress: false });
                } else {
                    if (
                        (options.accept &&
                            options.accept.length &&
                            (options.accept.includes(
                                `.${file.name
                                    .split('.')
                                    .pop()
                                    .toUpperCase()}`
                            ) ||
                                options.accept.includes(
                                    `.${file.name
                                        .split('.')
                                        .pop()
                                        .toLowerCase()}`
                                ))) ||
                        (!Array.isArray(options.accept) &&
                            (file.name
                                .split('.')
                                .pop()
                                .toUpperCase() === options.accept.split('.').pop() ||
                                file.name
                                    .split('.')
                                    .pop()
                                    .toLowerCase() === options.accept.split('.').pop()))
                    ) {
                        const fileSize = file.size / 1000000;
                        if (fileSize > 11) {
                            NotificationHelper.getInstance().error(INVALID_FILE_SIZE);
                            this.setState({ inProgress: false });
                        } else {
                            this.handleUpload(file);
                            return false;
                        }
                    } else {
                        NotificationHelper.getInstance().error(INVALID_FILE_FORMAT);
                        this.setState({ inProgress: false });
                    }
                }
            },
            ...options
        };
        const data = input.value && input.value !== '' ? JSON.parse(input.value) : [];
        return (
            <div className="field-wrapper">
                <input type="text" {...input} {...rest} hidden={true} />
                <AntUpload {...uploadProps} disabled={rest.disabled || (options && options.disabled) || inProgress}>
                    <button className="tpip-btn-blue regular btn-upload" type="button">
                        {inProgress ? (
                            <>
                                <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                                <span className="btn-text">Uploading...</span>
                            </>
                        ) : (
                            <>
                                <i className="fa fa-upload" aria-hidden="true"></i>
                                <span className="btn-text">Upload</span>
                            </>
                        )}
                    </button>
                </AntUpload>
                {data.map((file, dKey) => (
                    <div className={`resource-wrapper ${status ? status : 'success'}`} key={dKey}>
                        <div className="left-wrap pull-left">
                            <FileDownloader
                                type="resource"
                                fileName={options.name}
                                url={file.url}
                                isPublic={options.isPublic}
                            />
                        </div>
                        {!rest.disabled && !file.isPublished && (
                            <div className="right-wrap pull-right">
                                <i
                                    className="fa fa-times fa-icon"
                                    aria-hidden="true"
                                    onClick={() => {
                                        this.removeFile(dKey);
                                    }}
                                ></i>
                            </div>
                        )}
                    </div>
                ))}
                {hasError && <span className="error">{error}</span>}
            </div>
        );
    }
}
