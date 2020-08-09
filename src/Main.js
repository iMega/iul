import React from "react";
import styled from "@emotion/styled";

import { useQuery } from "@apollo/client";

import Storage from "./Storage";
import UploaderComponent from "./Uploader";
import {
    componentConfig,
    djsConfig,
    eventHandlers,
    removeFiles
} from "./Dropzone";

const title = "title";
const num = "num";
const filename = "filename";
const doc = "doc";
const version = "version";
const revision = "revision";
const contributors = "contributors";
const Fields = {
    title,
    num,
    filename,
    doc,
    version,
    revision,
    contributors
};

const HIDE_DROPZONE = -170;

const Main = props => {
    const { data, loading, error } = useQuery(docsND, {
        variables: { id: "333" }
    });
    console.log("MAIN", props, data, loading, error);

    props.generateDocumentResult.client.cache.writeQuery({
        query: docsND,
        data: {
            docs: [{ id: 2222 }]
        }
    });

    const { generateDocument } = props;
    const [files, setFiles] = React.useState();
    const [previewZonebottom, SetPreviewZonebottom] = React.useState(
        HIDE_DROPZONE
    );
    const PreviewZoneRef = React.createRef();
    return (
        <CenterContent>
            <Table>
                <tbody>
                    <tr>
                        <Td
                            colSpan={5}
                            contentEditable={true}
                            id={Fields.title}
                        >
                            Информационно-удостоверяющий лист для
                            проектно-сметной документации
                        </Td>
                    </tr>
                    <tr>
                        <Th>Номер п/п</Th>
                        <Th>Обозначение документа</Th>
                        <Th>Наименование изделия, наименование документа</Th>
                        <Th>Версия</Th>
                        <Th>Номер последнего изменения</Th>
                    </tr>
                    <tr>
                        <Td contentEditable={true} id={Fields.num} />
                        <Td contentEditable={true} id={Fields.filename} />
                        <Td contentEditable={true} id={Fields.doc} />
                        <Td contentEditable={true} id={Fields.version} />
                        <Td contentEditable={true} id={Fields.revision} />
                    </tr>
                </tbody>
            </Table>
            {files &&
                files.map(file => (
                    <TableFile key={file.md5}>
                        <tbody>
                            <tr>
                                <Td>Файл</Td>
                                <Td>{file.name}</Td>
                            </tr>
                            <tr>
                                <Td>Размер</Td>
                                <Td>{file.size}</Td>
                            </tr>
                            <tr>
                                <Td>MD5</Td>
                                <Td>{file.md5}</Td>
                            </tr>
                        </tbody>
                    </TableFile>
                ))}
            <Dropzone id={"dropzone"}>
                <Label>⇩</Label>
                <PreviewZone
                    id={"preview"}
                    className="filepicker dropzone"
                    $bottom={previewZonebottom}
                    ref={PreviewZoneRef}
                />
            </Dropzone>
            <UploaderComponent
                config={componentConfig}
                djsConfig={djsConfig}
                eventHandlers={eventHandlers(SetPreviewZonebottom, setFiles)}
            />
            <TableContributors>
                <tbody>
                    {[0, 1, 2].map(i => (
                        <tr>
                            <Td
                                contentEditable={true}
                                id={Fields.contributors + i + "title"}
                            />
                            <Td
                                contentEditable={true}
                                id={Fields.contributors + i + "name"}
                            />
                            <Th />
                            <Td
                                contentEditable={true}
                                id={Fields.contributors + i + "date"}
                            />
                        </tr>
                    ))}
                </tbody>
            </TableContributors>
            <Action>
                <Button onClick={Generate(generateDocument, files)}>
                    Создать PDF...
                </Button>
            </Action>
        </CenterContent>
    );
};

const Dropzone = styled.div({
    gridArea: "dropzone",
    height: "14em",
    backgroundColor: "gray",
    overflow: "hidden",
    position: "relative"
});

const Label = styled.div({
    margin: "2em",
    border: "4px dashed #e5e5e5",
    borderRadius: "20px",
    height: "10em",
    boxSizing: "border-box",
    display: "grid",
    justifyContent: "center",
    alignContent: "center"
});

const PreviewZone = styled.div(
    {
        left: 0,
        overflowY: "auto",
        position: "absolute",
        right: 0
    },
    props => {
        if (props.$bottom === 0) {
            return {
                bottom: props.$bottom,
                transitionDelay: "0s"
            };
        } else {
            return {
                bottom: `${props.$bottom}px`,
                transitionDelay: "2s",
                transitionDuration: "0.4s",
                transitionProperty: "bottom",
                transitionTimingFunction: "ease-in-out"
            };
        }
    }
);

const CenterContent = styled.div({
    display: "grid",
    gridGap: "2em",
    gridTemplateColumns: "auto minmax(200px, 50em) auto",
    gridTemplateAreas: `". table ." ". tablefile ." ". dropzone ." ". contributors ." ". action ."`
});

const Table = styled.table({
    gridArea: "table",
    border: "1px solid #264653",
    borderCollapse: "collapse"
});

const TableContributors = styled.table({
    gridArea: "contributors",
    border: "1px solid #264653",
    borderCollapse: "collapse"
});

const TableFile = styled(Table)({
    margin: "2em 0",
    gridArea: "tablefile"
});

const Th = styled.th({
    backgroundColor: "#e5e5e5",
    border: "1px solid #264653",
    textAlign: "center",
    verticalAlign: "middle",
    padding: "1em 0.5em"
});

const Td = styled.td({
    border: "1px solid #264653",
    padding: "1em 0.5em",
    ["&:focus"]: {
        outline: "2px solid #e9c46a"
    }
});

const Action = styled.div({
    display: "grid",
    gridArea: "action",
    justifyContent: "center",
    margin: "1em"
});

const Button = styled.button({
    fontWeight: "bold",
    backgroundColor: "#2a9d8f",
    color: "#e9c46a",
    width: "max-content",
    padding: "1em 1.5em",
    cursor: "pointer",
    borderRadius: "4px",
    ["&:hover"]: {
        color: "#264653",
        backgroundColor: "#e9c46a"
    },
    ["&:active"]: {
        color: "#264653",
        backgroundColor: "#f4a261"
    }
});

const Generate = (generateDocument, files = []) => () => {
    let req = { files };

    const fields = Object.keys(Fields);
    fields.forEach(f =>
        Object.assign(req, { [f]: document.getElementById(f)?.innerText })
    );

    const contributors = [0, 1, 2].map(i => ({
        title: document.getElementById("contributors" + i + "title").innerText,
        name: document.getElementById("contributors" + i + "name").innerText,
        date: document.getElementById("contributors" + i + "date").innerText
    }));

    generateDocument({ variables: { in: { ...req, contributors } } });
};

export default Storage(Main);
