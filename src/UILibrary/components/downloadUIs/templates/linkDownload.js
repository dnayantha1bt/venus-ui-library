import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';

import FormHeaderComponent from '../../forms/formHeader';
import { FileDownloader } from '../../forms/fields';
import docData from './docObject.json';

const isArrayOrNot = data => {
    try {
        const convertedData = JSON.parse(data);
        if (Array.isArray(convertedData)) return true;
        return false;
    } catch (error) {
        return false;
    }
};

let DownloadUsingDocumentLink = props => {
    const {
        dataset,
        options: { title = null, titleIicon = null },
        downloadOptions: { api, bucketName = null },
        documentConfig
    } = props;

    const [documentData, setDocumentData] = useState(docData);
    useEffect(() => {
        if (dataset.documents) {
            setDocumentData(dataset.documents);
        }
    }, [dataset.documents]);

    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: []
    };

    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />

            <form onSubmit={() => {}}>
                <div className="form-body custom-dwld-draft">
                    {documentConfig.map(
                        (doc, key) =>
                            documentData[doc.key] && (
                                <Row className="input-row" key={key}>
                                    <b className="title-sclla">{doc.title}</b>

                                    {isArrayOrNot(documentData[doc.key]) ? (
                                        JSON.parse(documentData[doc.key]).map((docItem, key) => (
                                            <Row className="input-row" key={key}>
                                                <Col className="files-sclla">
                                                    <FileDownloader
                                                        type="resource"
                                                        url={docItem.url}
                                                        bucketName={
                                                            bucketName
                                                        }
                                                        api={api}
                                                    />
                                                </Col>
                                            </Row>
                                        ))
                                    ) : (
                                        <Row className="input-row" key={key}>
                                            <Col className="files-sclla">
                                                <FileDownloader
                                                    type="resource"
                                                    url={docData[doc.key].url}
                                                    bucketName={bucketName}
                                                    api={api}
                                                />
                                            </Col>
                                        </Row>
                                    )}
                                </Row>
                            )
                    )}
                </div>
            </form>
        </>
    );
};

export default DownloadUsingDocumentLink;
