import React from "react";
import styled from "@emotion/styled";

const DocList = ({ index, openDoc }) => (
    <List>
        {index.map(i => (
            <Doc key={i.id} onClick={openDoc(i.id)} {...i} />
        ))}
    </List>
);

const Doc = props => (
    <Button {...props}>
        <ContentCenter>
            <DocCard>
                <Preview></Preview>
                <Caption title={props.title}>
                    <Label>{props.filename || props.date}</Label>
                </Caption>
            </DocCard>
        </ContentCenter>
    </Button>
);

const ContentCenter = styled.div({
    display: "grid",
    alignItems: "center",
    justifyContent: "center"
});

const Button = styled.button({
    cursor: "pointer",
    "&:focus": {
        outline: "2px solid #279AF1"
    },
    "&:hover": {
        outline: "2px solid #279AF1"
    }
});

const List = styled.div({
    display: "grid",
    gridGap: "1em",
    gridTemplateColumns: "repeat(auto-fill,minmax(8em,1fr))",
    marginTop: "1em"
});

const DocCard = styled.div({
    height: "10em",
    width: "8em",
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    overflow: "hidden"
});

const Preview = styled.div(props => ({
    backgroundColor: "var(--bgInput)",
    border: "1px solid #264653",
    flex: "1 1 auto",
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
}));

const Caption = styled.div({
    display: "flex",
    justifyContent: "center",
    flex: "0 0 20px",
    whiteSpace: "nowrap",
    alignItems: "start"
});

const Label = styled.p({
    fontSize: "0.8em",
    textOverflow: "ellipsis",
    overflow: "hidden"
});

export default DocList;
