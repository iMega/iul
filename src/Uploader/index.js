import React from "react";
import ReactDOM from "react-dom";
import extend from "extend";
import Dropzone from "dropzone";

import { Icon } from "./icon";

let DZ = null;

const UploaderComponent = props => {
    console.log("UPL", props);

    const [files, setFiles] = React.useState([]);

    React.useEffect(() => {
        console.log("++++++++++++DZ");

        DZ = new Dropzone(props.config.dropzoneSelector, {
            ...props.djsConfig,
            url: props.config.postUrl
        });
        for (const [event, func] of Object.entries(props.eventHandlers)) {
            if (event === "init") {
                props.eventHandlers.init(DZ);
                continue;
            }
            if (event === "success") {
                DZ.on(event, props.eventHandlers.success);
                continue;
            }
            DZ.on(event, func);
        }

        props.eventHandlers.init(DZ);

        DZ.on("addedfile", file => {
            if (!file) {
                return;
            }

            setFiles([...files, file]);
        });

        DZ.on("removedfile", file => {
            if (!file) return;

            const fs = files.map(f => {
                if (f.name === file.name && f.size === file.size) {
                    return f;
                }
                return f;
            });

            setFiles(fs);
        });

        return () => {};
    }, []);

    const icons = [];
    return (
        <React.Fragment>
            <button
                onClick={() => {
                    props.eventHandlers.success("", {
                        files: [{ md5: "sdfsdfsdf" }]
                    });
                }}
            >
                AAAAAAA
            </button>
            <form action={props.action}>
                {icons}
                {props.children}
            </form>
        </React.Fragment>
    );
};

export default UploaderComponent;
