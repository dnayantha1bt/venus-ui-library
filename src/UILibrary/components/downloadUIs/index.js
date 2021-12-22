import React from 'react';

import SimpleFormDataDownload from './templates/formDataZipDownload';
import TabFormDataDownload from './templates/formTabsZipDownload';
import FormDataChangeAndDownload from './templates/formDataZipDownloadWithchange';
import FormTabDataChangeAndDownload from './templates/formTabDataZipDownloadWithchange';
import DownloadUsingDocumentLink from './templates/linkDownload';

import constants from '../../constants';
const {
    DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE,
    DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE_WITH_DATA_CHANGE,
    DOWNLOAD_USING_DOCUMENT_LINK,
    DOWNLOAD_FORM_DATA_ZIP_TYPE_TABS
} = constants;

let CreateDownloadSection = props => {
    const { downloadType, formFieldData, formTabs, formFieldFunction } = props;

    return (
        <>
            <div className="lgim-styles-wrapper">
                {downloadType === DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE && (formFieldData || formFieldFunction) ? (
                    <SimpleFormDataDownload {...props} />
                ) : downloadType === DOWNLOAD_FORM_DATA_ZIP_TYPE_TABS && formTabs ? (
                    <TabFormDataDownload {...props} />
                ) : downloadType === DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE_WITH_DATA_CHANGE &&
                  (formFieldData || formFieldFunction) ? (
                    <FormDataChangeAndDownload {...props} />
                ) : downloadType === DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE_WITH_DATA_CHANGE && formTabs ? (
                    <FormTabDataChangeAndDownload {...props} />
                ) : downloadType === DOWNLOAD_USING_DOCUMENT_LINK ? (
                    <DownloadUsingDocumentLink {...props} />
                ) : null}
            </div>
        </>
    );
};

export default CreateDownloadSection;
