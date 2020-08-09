import React from "react";
import styled from "@emotion/styled";

import Bumper from "./Bumber";
import Label from "./Label";

const Input = styled.input(
    {
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
    },
    props => {
        let p = {};
        for (const [key, value] of Object.entries(props)) {
            if (typeof value === "string") {
                Object.assign(p, { [key]: value });
            }
        }
        return p;
    }
);

const InputWithLabel = props => (
    <Bumper>
        <Label htmlFor={props.name}>{props.label}</Label>
        <Input {...props} />
    </Bumper>
);

export { Input, InputWithLabel };
