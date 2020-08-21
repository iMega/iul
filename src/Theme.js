import React from "react";
import { Global, css } from "@emotion/core";

const Theme = () => {
    return <Global styles={css({ ":root": getTheme() })} />;
};

const getTheme = () => light;

const light = {
    "--tr":
        "background-color 0.4s ease-out, border-color 0.4 ease-out, color 0.4 ease-out",
    "--fontColor": "hsl(0, 0%, 23%)",
    "--fontColorDisabled": "hsl(0, 0%, 55%)",
    "--bgColor": "hsla(0, 0%, 100%, 0)",
    "--bgButton": "hsla(0, 0%, 96.1%, 0)",
    "--bgButtonActive":
        "linear-gradient(0deg, rgba(208,208,208,1) 0%, rgba(228,228,228,1) 100%)",
    "--borderColorWE": "hsl(0, 0%, 83%)",
    "--borderColorS": "hsl(0, 0%, 75%)",
    "--borderColorN": "hsl(0, 0%, 89%)",
    "--bgInput": "hsl(0, 0%, 100%)",
    "--bgTopbar":
        "linear-gradient(0deg, hsl(0, 0%, 80%) 0%, hsl(0, 0%, 90%) 100%)",
    "--bgColorPanel": "hsl(0, 0%, 90%)",
    "--borderColorPanel": "hsl(0, 0%, 90%)"
};
const dark = {
    "--tr":
        "background-color 0.4s ease-out, border-color 0.4 ease-out, color 0.4 ease-out",
    "--fontColor": "hsl(0, 0%, 91%)",
    "--fontColorDisabled": "hsl(0, 0%, 40%)",
    "--bgColor": "hsl(0, 0%, 21%)",
    "--borderColorWE": "hsl(0, 0%, 40%)",
    "--borderColorS": "hsl(0, 0%, 27%)",
    "--borderColorN": "hsl(0, 0%, 35%)",
    "--bgInput": "hsl(0, 0%, 40%)",
    "--bgTopbar":
        "linear-gradient(0deg, hsl(0, 0%, 23%) 0%, hsl(0, 0%, 28%) 100%)",
    "--bgColorPanel": "hsl(0, 0%, 23%)",
    "--borderColorPanel": "hsl(0, 0%, 29%)"
};

export default Theme;
