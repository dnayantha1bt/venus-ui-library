import React from 'react';

import data from './dataset.json';
import documentConfig from './documentConfig.json';
import { FORM_TITLE, REQUEST_A_FORMAL_PROPOSAL_FROM_US } from './constants';
import CreateDownloadSection from '../../UILibrary/components/downloadUIs';
import constants from '../../UILibrary/constants';

const { BUTTON_TITLE_CONTINUE, DOWNLOAD_USING_DOCUMENT_LINK } = constants;

let DownloadUsingDocumentLink = props => {
    return (
        <>
            <CreateDownloadSection
                dataset={data}
                documentConfig={documentConfig}
                downloadType={DOWNLOAD_USING_DOCUMENT_LINK}
                options={{
                    title: FORM_TITLE,
                    titleIicon: REQUEST_A_FORMAL_PROPOSAL_FROM_US,
                    saveButton: false,
                    submitButton: {
                        title: BUTTON_TITLE_CONTINUE,
                        showButton: true
                    },
                    onSubmitMessage: null
                }}
                {...props}
            />
        </>
    );
};

export default DownloadUsingDocumentLink;
