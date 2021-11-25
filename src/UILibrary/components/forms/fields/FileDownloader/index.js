import React, { Component } from 'react';
import { saveAs } from 'file-saver';
import excelIcon from '../../../../icons/excelLogo.svg';

// pass bucket (privateBucketName or publicBucketName) & api as prop
export const readFile = async data => {
    const { url, file, bucketNameProp, api } = data;

    return new Promise(async (resolve, reject) => {
        let fileSource = null;
        if (url) {
            let _url = url.trim();
            _url = _url.replace(/ /g, '_');
            const bucketName = bucketNameProp;

            const { data } = await api.getDownloadUrl({ bucketName, filePath: `${_url}` });
            const resource = await api.getResource(data.content.url);
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

// pass bucket (privateBucketName or publicBucketName) & api as prop
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
