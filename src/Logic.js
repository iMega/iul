import React from "react";
import PropTypes from "prop-types";

import Documentor from "./Documentor";
import Layout from "./Layout";
import TopBar from "./Topbar";
import Storage from "./Storage";
import DocList from "./DocList";
import Document from "./Document";

import Theme from "./Theme";

const Logic = props => {
    const { generateDocument, generateDocumentResult } = props;
    const [currentDoc, setDoc] = React.useState({ id: "" });
    const { doc, index } = Documentor.list(currentDoc);

    React.useEffect(() => setDoc(doc), []);

    const actionsList = actions({
        generateDocument,
        generateDocumentResult,
        currentDoc,
        setDoc
    });

    return (
        <CenterContent>
            <Theme />
            <TopBar {...actionsList} />
            <Layout>
                {currentDoc.id === "" && (
                    <DocList {...{ ...actionsList, index }} />
                )}
                {currentDoc.id !== "" && (
                    <Document {...{ ...actionsList, doc: currentDoc }} />
                )}
            </Layout>
        </CenterContent>
    );
};
import styled from "@emotion/styled";
const CenterContent = styled.div({
    display: "grid",
    gridTemplateColumns: "auto minmax(200px, 50em) auto",
    gridTemplateAreas: `". layout ."`
});

Logic.propTypes = {
    doc: PropTypes.object,
    index: PropTypes.array
};

const actions = ({
    generateDocument,
    generateDocumentResult,
    currentDoc,
    setDoc
}) => ({
    openFolder: () => {
        generateDocumentResult.client.cache.evict({ variables: { id: "" } });
        setDoc({ id: "" });
    },
    openDoc: id => () => setDoc(Documentor.openDoc(id)),
    newDoc: () => setDoc(Documentor.newDoc()),
    saveDoc: doc =>
        setDoc(Documentor.saveDoc(generateDocumentResult.client, doc)),
    download:
        currentDoc.id === ""
            ? null
            : () => generateDocument({ variables: { in: currentDoc } })
});

export default Storage(Logic);
