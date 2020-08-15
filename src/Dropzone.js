let DropZ = undefined;

const componentConfig = {
    dropzoneSelector: "#dropzone",
    postUrl: "http://nh:8080/api/upload"
    // postUrl: "/api/upload"
};

const djsConfig = {
    autoProcessQueue: false,
    previewsContainer: "div#preview"
};

const eventHandlers = (SetPreviewZonebottom, setFiles, curDoc, setCurDoc) => ({
    init: dz => (DropZ = dz),
    addedfile: file => {
        SetPreviewZonebottom(0);
        // keyForm({ variables: { in: { id: "" } } }).then(({ data }) => {
        //     file.key = data.form.key;
        //
        // });
        file.key = "";
        DropZ.processFile(file);
    },
    sending: (file, xhr, formData) => {
        formData.append("key", file.key);
    },
    success: (_, { files }) => {
        console.log("SUC", curDoc(), files);
        setFiles(null, files);
    },
    queuecomplete: () => {
        SetPreviewZonebottom(
            document.getElementById("preview").offsetHeight * -1
        );
    }
});

const removeFiles = ({ target }) => {
    if (target.id === "preview") {
        DropZ.removeAllFiles();
    }
};

export { componentConfig, djsConfig, eventHandlers, removeFiles };
