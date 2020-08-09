import React from "react";
import styled from "@emotion/styled";
import TextareaAutosize from "react-autosize-textarea";

import Bumper from "./Bumber";
import Label from "./Label";

const Textarea = styled(TextareaAutosize)({
    lineHeight: "1.5em",
    border: "2px solid",
    borderRadius: "4px",
    padding: "0.5em",
    width: "100%",
    boxSizing: "border-box",
    borderColor: "var(--borderColorWE)",
    borderColorBottom: "var(--borderColorS)",
    borderColorTop: "var(--borderColorN)",
    backgroundColor: "var(--bgInput)",
    transition: "var(--tr)",
    "&:focus": {
        border: "2px solid #279AF1"
    }
});

const TextareaWithLabel = props => (
    <Bumper>
        <Label htmlFor={props.name}>{props.label}</Label>
        <Textarea {...props} />
    </Bumper>
);

export { Textarea, TextareaWithLabel };
