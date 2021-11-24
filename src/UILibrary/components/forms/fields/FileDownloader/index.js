import React, { Component } from 'react';
import { saveAs } from 'file-saver';

// import connectApi from '../../../../../../middlewares/connectApi';
import excelIcon from '../../../../icons/excelLogo.svg';

// pass bucket (privateBucketName or publicBucketName) as prop
export const getSignedURL = async (url, bucket) => {
    return new Promise(async (resolve, reject) => {
        let _url = url.trim();
        _url = _url.replace(/ /g, '_');
        const bucketName = bucket;

        try {
            // const { data } = await connectApi.getDownloadUrl({ bucketName, filePath: `${_url}` });
            const { data } = {}; // change
            resolve({ status: 'success', data });
        } catch (e) {
            reject({ status: 'error' });
        }
    });
};

export const readFile = async data => {
    const { url, file, bucketNameProp } = data;

    return new Promise(async (resolve, reject) => {
        let fileSource = null;
        if (url) {
            let _url = url.trim();
            _url = _url.replace(/ /g, '_');
            const bucketName = bucketNameProp;

            // const { data } = await connectApi.getDownloadUrl({ bucketName, filePath: `${_url}` });
            // const resource = await connectApi.getResource(data.content.url);
            const { data } = {}; // change
            const resource = {};
            fileSource = resource.data;
        }

        if (file) fileSource = file;

        if (!fileSource) reject('No file source found');

        const reader = new FileReader();
        reader.onerror = function onerror(ev) {
            reject(ev.target.error);
        };
        reader.onload = function onload(ev) {
            resolve(ev.target.result);
        };

        fileSource && reader.readAsArrayBuffer(fileSource);
    });
};

export const checkFileAvailability = async param => {
    const { url, bucketNameProp } = param;
    const bucketName = bucketNameProp;
    try {
        // const { data } = await connectApi.checkFileAvailability({ bucketName, dirName: url });
        const { data } = {}; // change

        if (data && data.result) return true;
        return false;
    } catch (error) {
        return false;
    }
};

export const convertFile = async param => {
    const { url, bucketNameProp } = param;
    const bucketName = bucketNameProp;

    try {
        const fileName = url.split(`/`).pop();
        const s3pathurl = url.split(`/${fileName}`)[0];

        // const { data } = await connectApi.convertDocumentRequest({
        //     tenant: 'LGIM',
        //     s3bucketurl: bucketName,
        //     s3pathurl,
        //     fileName
        // });

        const { data } = {}; // change

        if (data && data.result) {
            const exist = await checkFileAvailability({ url });
            if (exist) return url;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const downloadFile = async (file, fileName) => {
    saveAs(new Blob([file], { type: 'application/octet-stream' }), fileName);
};

export default class FileDownloader extends Component {
    static defaultProps = {
        editable: true
    };
    constructor(props) {
        super(props);

        this.state = {
            inProgress: false,
            fileNameTemp: null,
            FileName: null
        };

        this.downloadFile = this.downloadFile.bind(this);
    }

    async downloadFile() {
        let fileName = '';
        if (this.props.fileName) {
            this.setState({ FileName: this.props.fileName });
            fileName = this.props.fileName;
        } else if (this.state.fileNameTemp) {
            this.setState({ FileName: this.state.fileNameTemp });
            fileName = this.state.fileNameTemp;
        }

        const { inProgress } = this.state;

        if (inProgress) return;
        if (fileName) {
            try {
                this.setState({ inProgress: true });

                const file = await readFile(this.props);
                saveAs(new Blob([file], { type: 'application/octet-stream' }), this.state.FileName);

                this.setState({ inProgress: false });
            } catch (error) {
                this.setState({ inProgress: false });
            }
        }
    }

    componentDidMount() {
        if (this.props.url) {
            const { url } = this.props;

            const chunks = url.split('/');
            let fileName = chunks[chunks.length - 1];
            fileName = fileName ? fileName.trim().replace(/__/g, ' ') : fileName;
            this.setState({ fileNameTemp: fileName });
        }
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        if (np.url) {
            const { url } = np;

            const chunks = url.split('/');
            let fileName = chunks[chunks.length - 1];
            fileName = fileName ? fileName.trim().replace(/__/g, ' ') : fileName;
            this.setState({ fileNameTemp: fileName });
        }
    }

    render() {
        const { type, disabled, editable, fileName: givenFilename, className } = this.props;
        const { inProgress } = this.state;

        let fileName = givenFilename ? givenFilename : this.state.fileNameTemp;
        return (
            <>
                {type === 'resource' ? (
                    <div className={`download-file-wrap clearfix ${className}`} onClick={this.downloadFile}>
                        <i
                            className={`fa fa-paperclip fa-icon ${inProgress ? 'fa-circle-o-notch fa-spin' : ''}`}
                            aria-hidden="true"
                        ></i>
                        <span className="resource-name">{fileName}</span>
                    </div>
                ) : type === 'resourceXSL' ? (
                    <div className={`download-file-wrap clearfix ${className}`} onClick={this.downloadFile}>
                        <img
                            className={`fa fa-icon ${inProgress ? 'fa-circle-o-notch fa-spin' : ''}`}
                            src={excelIcon}
                            aria-hidden="true"
                        />
                        <span className="resource-name">{fileName}</span>
                    </div>
                ) : type === 'primaryDownloadButton' ? (
                    <button
                        className="tpip-btn-blue btn-separate btn-outline-separate btn-download-separate"
                        disabled={disabled || !editable}
                        onClick={this.downloadFile}
                    >
                        <i
                            className={`fa fa-icon ${
                                inProgress ? 'fa-circle-o-notch fa-spin' : 'fa fa-icon fa-download'
                            }`}
                        ></i>
                        Download
                    </button>
                ) : type === 'primaryWidthDownloadButton' ? (
                    <button
                        className="btn-width-separate btn-outline-separate btn-download-separate"
                        type="button"
                        disabled={disabled || !editable}
                        onClick={this.downloadFile}
                    >
                        <i
                            className={`fa fa-icon ${
                                inProgress ? 'fa-circle-o-notch fa-spin' : 'fa fa-icon fa-download'
                            }`}
                        ></i>
                        Download
                    </button>
                ) : (
                    <button
                        type="button"
                        className={`tpip-btn-blue regular btn-download ${
                            disabled || !editable ? 'button-disabled' : ''
                        }`}
                        disabled={disabled || !editable}
                        onClick={this.downloadFile}
                    >
                        <i
                            className={`fa fa-download fa-icon ${inProgress ? 'fa-circle-o-notch fa-spin' : ''}`}
                            aria-hidden="true"
                        ></i>
                        <span className="btn-text">Download</span>
                    </button>
                )}
            </>
        );
    }
}
