import React from "react";
import styled from "@emotion/styled";

import { ButtonBar } from "./Controls";
import { BlankIcon, FolderIcon, DownloadIcon } from "./Controls/icons";

const TopBarLayoutStyle = styled.div({
    backgroundImage: "var(--bgTopbar)",
    position: "fixed",
    left: 0,
    right: 0,
    display: "grid",
    gridTemplateColumns: "auto minmax(200px, 50em) auto",
    gridTemplateAreas: `". topbar ."`,
    zIndex: 1
});

const TopBarStyle = styled.div({
    display: "flex",
    gridArea: "topbar"
});

const TopBar = ({ openFolder, newDoc, download }) => (
    <TopBarLayoutStyle>
        <TopBarStyle>
            <FolderButton onClick={openFolder} />
            <NewButton onClick={newDoc} />
            <DownloadButton onClick={download} disabled={download === null} />
        </TopBarStyle>
    </TopBarLayoutStyle>
);

const FolderButton = props => (
    <ButtonBar {...props} label={"Папка"} title={"Отобразить мои документы"}>
        <FolderIcon />
    </ButtonBar>
);
const NewButton = props => (
    <ButtonBar {...props} label={"Новый"} title={"Создать новый документ"}>
        <BlankIcon />
    </ButtonBar>
);
const DownloadButton = props => (
    <ButtonBar
        {...props}
        label={"Скачать"}
        title={"Загрузить документ на компьютер"}
    >
        <DownloadIcon />
    </ButtonBar>
);

export default TopBar;
