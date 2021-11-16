import React, { Component } from 'react';

class GenerateDownloader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { name, inProgress, disabled } = this.props;
        return (
            <>
                {' '}
                <button
                    className="btn-width-separate btn-outline-separate btn-download-separate"
                    type="button"
                    disabled={disabled}
                >
                    <i
                        className={`fa fa-icon ${inProgress ? 'fa-circle-o-notch fa-spin' : 'fa fa-icon fa-download'}`}
                    ></i>
                    {name}
                </button>
            </>
        );
    }
}

export default GenerateDownloader;
