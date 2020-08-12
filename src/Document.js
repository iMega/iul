import React from "react";
import RadioGroup from "buildo-react-components/lib/RadioGroup";
import styled from "@emotion/styled";

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
import UploaderComponent from "./Uploader";
import { componentConfig, djsConfig, eventHandlers } from "./Dropzone";
const HIDE_DROPZONE = -170;

const Document = ({ doc, saveDoc }) => {
    const [curDoc, setCurDoc] = React.useState(doc);
    const [gap, setGap] = React.useState();
    const [previewZonebottom, SetPreviewZonebottom] = React.useState(
        HIDE_DROPZONE
    );
    const PreviewZoneRef = React.createRef();
    const save = (ref, field, val) => () => {
        let document;
        if (field === "date") {
            const contributors = [...curDoc.contributors];
            document = {
                ...curDoc,
                contributors: contributors.map(c => ({
                    ...c,
                    date: ref.current.value
                }))
            };
        }
        if (field === "keycontributor1") {
            const contributors = [...curDoc.contributors];
            contributors[1] = { ...contributors[1], title: val };
            document = { ...curDoc, contributors };
        }
        if (field.startsWith("contributor") === true) {
            const contributors = [...curDoc.contributors];
            contributors[field.slice(-1)] = {
                ...contributors[field.slice(-1)],
                name: ref.current.value
            };
            document = { ...curDoc, contributors };
        }

        if (Object.keys(curDoc).includes(field) === true) {
            console.log("field", field, curDoc);
            document = { ...curDoc, [field]: ref.current.value };
        }
        console.log("save", curDoc, document);
        setCurDoc(document);
        saveDoc(document);
    };

    const setFiles = files => {
        const ref = {
            current: {
                value: files
            }
        };
        console.log("setFiles0", curDoc);
        save(ref, "files")();
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
                value={doc.title}
                innerRef={titleRef}
                onChange={save(titleRef, "title")}
            />
            <InputWithLabel
                label={"Обозначение документа (тома)"}
                value={curDoc.filename}
                innerRef={fileNameRef}
                onChange={save(fileNameRef, "filename")}
            />
            <TextareaWithLabel
                label={"Наименование документа (тома)"}
                rows={3}
                value={doc.doc}
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
                            value={doc.contributors[0].name}
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
                                value={doc.contributors[1].title}
                            />
                        </Area>
                        <Area>
                            <Input
                                innerRef={contributor2Ref}
                                onChange={save(contributor2Ref, "contributor1")}
                                value={doc.contributors[1].name}
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
                            value={doc.contributors[2].name}
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
                                value={doc.contributors[0].date}
                            />
                        </Area>
                        <Area />
                    </Grid>
                </Bumper>
            </Bumper>
            <Bumper>
                <Grid>
                    <Dropzone id={"dropzone"}>
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
                            <Area
                                display={"grid"}
                                alignContent={"center"}
                                padding={"0 0.2em"}
                            >
                                <p>
                                    Загрузите или перенесите сюда PDF&nbsp;файл
                                    не&nbsp;более 45&nbsp;МБ.
                                </p>
                            </Area>
                        </Area>
                        <PreviewZone
                            id={"preview"}
                            className="filepicker dropzone"
                            $bottom={previewZonebottom}
                            ref={PreviewZoneRef}
                        />
                    </Dropzone>
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
                            <span>{doc.files[0].md5}</span>
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
                        <span>{doc.files[0].size}</span>
                    </Area>
                </Grid>
            </Bumper>
            <UploaderComponent
                config={componentConfig}
                djsConfig={djsConfig}
                eventHandlers={eventHandlers(SetPreviewZonebottom, setFiles)}
            />
        </React.Fragment>
    );
};

const Dropzone = styled.div({
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

const PreviewZone = styled.div(
    {
        left: 0,
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

export default Document;
