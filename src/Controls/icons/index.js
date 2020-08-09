import React from "react";
import styled from "@emotion/styled";

import BlankIconRaw from "./blank.svg";
import DownloadIconRaw from "./download.svg";
import FolderIconRaw from "./folder.svg";
import PdfIconRaw from "./pdf.svg";
import UploadIconRaw from "./upload.svg";

const OpticallyBalance = styled.span(props => ({
    height: `${props.$height}em`,
    display: "flex",
    position: "relative",
    flexDirection: "column",
    width: "100%",
    left: props.$left && `${props.$left}px`,
    top: props.$top && `${props.$top}px`
}));

const BlankIcon = () => (
    <OpticallyBalance $height={2}>
        <BlankIconRaw />
    </OpticallyBalance>
);

const DownloadIcon = () => (
    <OpticallyBalance $height={2}>
        <DownloadIconRaw />
    </OpticallyBalance>
);

const FolderIcon = () => (
    <OpticallyBalance $height={2}>
        <FolderIconRaw />
    </OpticallyBalance>
);

const PdfIcon = () => (
    <OpticallyBalance $height={1.25}>
        <PdfIconRaw />
    </OpticallyBalance>
);

const UploadIcon = () => (
    <OpticallyBalance $height={5}>
        <UploadIconRaw />
    </OpticallyBalance>
);

export { BlankIcon, DownloadIcon, FolderIcon, PdfIcon, UploadIcon };
