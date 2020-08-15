import React from "react";
import styled from "@emotion/styled";

const ButtonBar = props => (
    <Button {...props}>
        <Card disabled={props.disabled}>
            <Preview>{props.children}</Preview>
            <Caption title={props.title}>
                <Label>{props.label}</Label>
            </Caption>
        </Card>
    </Button>
);

const Button = styled.button(
    {
        cursor: "pointer",
        "&:focus": {
            outline: "2px solid #279AF1"
        }
    },
    props => props.disabled && { color: "var(--fontColorDisabled)" }
);

const Card = styled.div(
    {
        height: "4em",
        width: "4em",
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        overflow: "hidden"
    },
    props => props.disabled && { color: "var(--fontColorDisabled)" }
);

const Preview = styled.div(props => ({
    flex: "1 1 auto",
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    backgroundColor: "var(--bgInput)",
    borderRadius: "4px",
    margin: "6px",
    border: "1px solid var(--borderColorWE)",
    borderBottomColor: "var(--borderColorS)",
    borderTopColor: "var(--borderColorN)"
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

export default ButtonBar;
