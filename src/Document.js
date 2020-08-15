import React from "react";
import RadioGroup from "buildo-react-components/lib/RadioGroup";
import styled from "@emotion/styled";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";

import {
    TextareaWithLabel,
    InputWithLabel,
    Input,
    Label,
    Bumper,
    Grid,
    Area,
    TextElipsis
} from "./Controls";
import { UploadIcon } from "./Controls/icons";

const InputDZ = ({ accept, onFiles, getFilesFromEvent }) => (
    <label class="dzu-inputLabel">
        <input
            class="dzu-input"
            type="file"
            accept={accept}
            onChange={e => {
                getFilesFromEvent(e).then(chosenFiles => {
                    onFiles(chosenFiles);
                });
            }}
        />
    </label>
);

const Prev = ({ previews, dropzoneProps, files, input }) => (
    <DropzoneStyle {...dropzoneProps}>
        <Area display={"grid"} gridTemplateColumns={"1fr 2fr"}>
            <Area
                display={"grid"}
                alignContent={"center"}
                justifyContent={"end"}
            >
                <Area maxWidth={"6em"}>
                    <UploadIcon />
                </Area>
            </Area>
            <Area display={"grid"} alignContent={"center"} padding={"0 0.2em"}>
                <p>
                    Загрузите или перенесите сюда PDF&nbsp;файл не&nbsp;более
                    45&nbsp;МБ.
                </p>
            </Area>
        </Area>
        {input}
        {(files.length > 0 && files[0].meta.status === "error_file_size" && (
            <div className={"dzu-previewContainer"} onClick={files[0].remove}>
                <span className="dzu-previewFileNameError">
                    {files[0].file.name}
                </span>
                <span>размер файла более 45 МБ.</span>
            </div>
        )) ||
            previews}
    </DropzoneStyle>
);

const MyUploader = ({ save }) => {
    const getUploadParams = ({ meta }) => {
        // return { url: "http://nh:8080/api/upload" };
        return { url: "/api/upload" };
    };

    const handleChangeStatus = async (fileWithMeta, status) => {
        if (status !== "done") {
            return;
        }

        const { xhr, remove } = fileWithMeta;
        const resp = await xhr;

        const { files } = JSON.parse(resp.response);
        save(null, files);

        remove();
    };

    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject));
            });
        });
    };

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            canCancel={true}
            maxFiles={1}
            multiple={false}
            accept="application/pdf"
            LayoutComponent={Prev}
            InputComponent={InputDZ}
            maxSizeBytes={1024 * 1024 * 45}
            getFilesFromEvent={getFilesFromEvent}
        />
    );
};

const Document = ({ doc, saveDoc }) => {
    const [curDoc, setCurDoc] = React.useState(doc);
    const [gap, setGap] = React.useState();

    React.useEffect(() => {
        doc.id !== curDoc.id && setCurDoc(doc);
    }, [doc.id]);

    const save = (ref, field, val) => {
        return (_, f) => {
            const document = makeDocument(
                curDoc,
                field,
                f || val || ref.current.value
            );

            console.log("save", document);
            setCurDoc(document);
            saveDoc(document);
        };
    };

    const titleRef = React.createRef();
    const fileNameRef = React.createRef();
    const docNameRef = React.createRef();

    const contributor1Ref = React.createRef();
    const contributor2Ref = React.createRef();
    const contributor3Ref = React.createRef();
    const dateDocRef = React.createRef();

    const options = [
        {
            label: "ГАП",
            value: "ГАП"
        },
        {
            label: "ГИП",
            value: "ГИП"
        }
    ];

    return (
        <React.Fragment>
            <TextareaWithLabel
                label={"Наименование объекта капитального строительства"}
                rows={2}
                value={curDoc.title}
                innerRef={titleRef}
                onChange={save(titleRef, "title")}
            />
            <InputWithLabel
                label={"Обозначение документа (тома)"}
                value={curDoc.filename}
                innerRef={fileNameRef}
                onChange={save(fileNameRef, "filename")}
                autoComplete="on"
            />
            <TextareaWithLabel
                label={"Наименование документа (тома)"}
                rows={3}
                value={curDoc.doc}
                innerRef={docNameRef}
                onChange={save(docNameRef, "doc")}
            />
            <Bumper>
                <Label>Фамилии лиц, подписывающие документ (том)</Label>
                <Grid gridTemplateColumns={"1fr 2fr"}>
                    <Area
                        display={"grid"}
                        alignContent={"center"}
                        padding={"0.5em"}
                        justifyContent={"end"}
                    >
                        <span>Разраб.</span>
                    </Area>
                    <Area>
                        <Input
                            innerRef={contributor1Ref}
                            onChange={save(contributor1Ref, "contributor0")}
                            value={curDoc.contributors[0].name}
                        />
                    </Area>
                </Grid>
                <Bumper>
                    <Grid gridTemplateColumns={"1fr 2fr"}>
                        <Area
                            display={"grid"}
                            alignContent={"center"}
                            padding={"0.5em"}
                            justifyContent={"end"}
                        >
                            <RadioGroup
                                horizontal
                                value={gap}
                                onChange={v => {
                                    save(null, "keycontributor1", v)();
                                    setGap(v);
                                }}
                                options={options}
                                value={curDoc.contributors[1].title}
                            />
                        </Area>
                        <Area>
                            <Input
                                innerRef={contributor2Ref}
                                onChange={save(contributor2Ref, "contributor1")}
                                value={curDoc.contributors[1].name}
                            />
                        </Area>
                    </Grid>
                </Bumper>
                <Grid gridTemplateColumns={"1fr 2fr"}>
                    <Area
                        display={"grid"}
                        alignContent={"center"}
                        padding={"0.5em"}
                        justifyContent={"end"}
                    >
                        <span>Н.контр.</span>
                    </Area>
                    <Area>
                        <Input
                            innerRef={contributor3Ref}
                            onChange={save(contributor3Ref, "contributor2")}
                            value={curDoc.contributors[2].name}
                        />
                    </Area>
                </Grid>
                <Bumper>
                    <Grid gridTemplateColumns={"1fr 2fr"}>
                        <Area
                            display={"grid"}
                            alignContent={"center"}
                            padding={"0.5em"}
                            justifyContent={"end"}
                        >
                            <TextElipsis>Дата подписания</TextElipsis>
                        </Area>
                        <Area>
                            <Input
                                maxWidth={"10em"}
                                type={"date"}
                                innerRef={dateDocRef}
                                onChange={save(dateDocRef, "date")}
                                value={curDoc.contributors[0].date}
                            />
                        </Area>
                        <Area />
                    </Grid>
                </Bumper>
            </Bumper>
            <Bumper>
                <Grid>
                    <MyUploader save={save(null, "files", null)} />
                </Grid>
                <Bumper>
                    <Grid gridTemplateColumns={"1fr 2fr"}>
                        <Area
                            display={"grid"}
                            alignContent={"center"}
                            padding={"0.5em"}
                            justifyContent={"end"}
                        >
                            <span>MD5</span>
                        </Area>
                        <Area
                            display={"grid"}
                            alignContent={"center"}
                            padding={"0.5em"}
                        >
                            <span>{curDoc.files[0].md5}</span>
                        </Area>
                    </Grid>
                </Bumper>
                <Grid gridTemplateColumns={"1fr 2fr"}>
                    <Area
                        display={"grid"}
                        alignContent={"center"}
                        padding={"0.5em"}
                        justifyContent={"end"}
                    >
                        <span>Размер</span>
                    </Area>
                    <Area
                        display={"grid"}
                        alignContent={"center"}
                        padding={"0.5em"}
                    >
                        <span>{curDoc.files[0].size}</span>
                    </Area>
                </Grid>
            </Bumper>
        </React.Fragment>
    );
};

const makeDocument = (doc, field, value) => {
    let document;
    if (field === "date") {
        const contributors = [...doc.contributors];
        document = {
            ...doc,
            contributors: contributors.map(c => ({ ...c, date: value }))
        };
    }
    if (field === "keycontributor1") {
        const contributors = [...doc.contributors];
        contributors[1] = { ...contributors[1], title: value };
        document = { ...doc, contributors };
    }
    if (field.startsWith("contributor") === true) {
        const contributors = [...doc.contributors];
        contributors[field.slice(-1)] = {
            ...contributors[field.slice(-1)],
            name: value
        };
        document = { ...doc, contributors };
    }

    if (Object.keys(doc).includes(field) === true) {
        document = { ...doc, [field]: value };
    }

    return document;
};

const DropzoneStyle = styled.div({
    cursor: "pointer",
    height: "6em",
    overflow: "hidden",
    position: "relative",
    display: "grid",
    border: "2px solid var(--borderColorPanel)",
    borderRadius: "4px",
    "&:hover": {
        border: "2px solid #279AF1"
    }
});

export default Document;
