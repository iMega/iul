import React from "react";
import { Global } from "@emotion/core";

const Normalize = () => <Global styles={Style} />;

const Style = `
    /* Reset ========================================================================== */
    html,
    body,
    div,
    span,
    h1,
    h2,
    h3,
    p,
    a,
    img,
    b,
    u,
    i,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    main,
    menu,
    nav,
    section,
    template {
        display: block;
    }

    body,
    html {
        height: 100%;
    }

    body {
        line-height: 1;
        font-weight: normal;
        font-size: calc(16px + (18 - 16) * ((100vw - 320px) / (1600 - 320)));
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    ol,
    ul {
        list-style: none;
    }

    blockquote,
    q {
        quotes: none;
    }

    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: "";
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    input,
    form label,
    label,
    select,
    button,
    textarea {
        margin: 0;
        border: 0;
        padding: 0;
        display: inline-block;
        vertical-align: middle;
        white-space: normal;
        background: none;
        line-height: 1;
        font-family: inherit;
        font-size: 100%;
        color: var(--fontColor);
        transition: var(--tr);
    }

    textarea{
        white-space: break-spaces;
    }

    input,
    textarea {
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    :focus {
        outline: 0;
    }

    /**
 * 1. Address box sizing set to content-box in IE 8/9.
 * 2. Remove excess padding in IE 8/9.
 */

    input[type="date"] {
        -webkit-appearance: menulist;
        -moz-appearance: menulist;
        appearance: menulist;
    }

    button,
    input[type="reset"],
    input[type="button"],
    input[type="submit"],
    input[type="checkbox"],
    input[type="radio"],
    select {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box; /* 1 */
    }

    input[type="checkbox"],
    input[type="radio"] {
        padding: 0; /* 2 */
        width: 13px;
        height: 13px;
    }

    input[type="search"] {
        -webkit-appearance: textfield;
        -webkit-box-sizing: content-box;
    }

    ::-webkit-search-decoration {
        display: none;
    }

    button,
    input[type="reset"],
    input[type="button"],
    input[type="submit"] {
        width: auto;
        -webkit-appearance: button;
    }

    ::-webkit-file-upload-button {
        padding: 0;
        border: 0;
        background: none;
    }

    textarea {
        vertical-align: top;
        overflow: auto;
        resize: vertical;
    }

    select[multiple] {
        vertical-align: top;
    }

    a {
        color: #00a7e1;
    }

    a:hover,
    a:focus {
        text-decoration: none;
    }

    svg {
        fill: currentColor;
        height: 100%;
        width: 100%;
    }

    /* Normalize. Document
   ========================================================================== */

    /**
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

    html {
        text-size-adjust: 100%; /* 2 */
        -moz-text-size-adjust: 100%; /* 2 */
        -webkit-text-size-adjust: 100%; /* 2 */
        -ms-text-size-adjust: 100%; /* 2 */
    }

    /* Normalize. Grouping content
   ========================================================================== */

    /**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

    hr {
        box-sizing: content-box; /* 1 */
        height: 0; /* 1 */
        overflow: visible; /* 2 */
    }

    /**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd em font sizing in all browsers.
 */

    pre {
        font-family: monospace, monospace; /* 1 */
        font-size: 1em; /* 2 */
    }

    /* Normalize. Text-level semantics
   ========================================================================== */

    /**
 * Remove the gray background on active links in IE 10.
 */

    a {
        background-color: transparent;
    }

    /**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

    abbr[title] {
        border-bottom: none; /* 1 */
        text-decoration: underline; /* 2 */
        text-decoration: underline dotted; /* 2 */
    }

    /**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

    b,
    strong {
        font-weight: bolder;
    }

    /**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd em font sizing in all browsers.
 */

    code,
    kbd,
    samp {
        font-family: monospace, monospace; /* 1 */
        font-size: 1em; /* 2 */
    }

    /**
 * Add the correct font size in all browsers.
 */

    small {
        font-size: 80%;
    }

    /**
 * Prevent sub and sup elements from affecting the line height in
 * all browsers.
 */

    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }

    sub {
        bottom: -0.25em;
    }

    sup {
        top: -0.5em;
    }

    /* Normalize. Embedded content
   ========================================================================== */

    /**
 * Remove the border on images inside links in IE 10.
 */

    img {
        border-style: none;
    }

    /* Normalize. Forms
   ========================================================================== */

    /**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

    button,
    input {
        /* 1 */
        overflow: visible;
    }

    /**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

    button,
    select {
        /* 1 */
        text-transform: none;
    }

    /**
 * Remove the inner border and padding in Firefox.
 */

    button::-moz-focus-inner,
    [type="button"]::-moz-focus-inner,
    [type="reset"]::-moz-focus-inner,
    [type="submit"]::-moz-focus-inner {
        border-style: none;
        padding: 0;
    }

    /**
 * Restore the focus styles unset by the previous rule.
 */

    button:-moz-focusring,
    [type="button"]:-moz-focusring,
    [type="reset"]:-moz-focusring,
    [type="submit"]:-moz-focusring {
        outline: 1px dotted ButtonText;
    }

    /**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from fieldset elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    fieldset elements in all browsers.
 */

    legend {
        box-sizing: border-box; /* 1 */
        color: inherit; /* 2 */
        display: table; /* 1 */
        max-width: 100%; /* 1 */
        white-space: normal; /* 1 */
    }

    /**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

    progress {
        vertical-align: baseline;
    }

    /**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

    [type="number"]::-webkit-inner-spin-button,
    [type="number"]::-webkit-outer-spin-button {
        height: auto;
    }

    /**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

    [type="search"] {
        -webkit-appearance: textfield; /* 1 */
        outline-offset: -2px; /* 2 */
    }

    /**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

    [type="search"]::-webkit-search-decoration {
        -webkit-appearance: none;
    }

    /**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to inherit in Safari.
 */

    ::-webkit-file-upload-button {
        -webkit-appearance: button; /* 1 */
        font: inherit; /* 2 */
    }

    /*
 * Add the correct display in all browsers.
 */

    summary {
        display: list-item;
    }

    /**
 * Add the correct display in IE 10.
 */

    [hidden] {
        display: none;
    }

    @font-face {
        font-family: EditorFontHeader;
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        font-feature-settings: "ss02" 1, "case" 1, "cv09" 1;
        src: url("https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.9")
                format("woff2"),
            url("https://rsms.me/inter/font-files/Inter-Regular.woff?v=3.9")
                format("woff");
    }
    @font-face {
        font-family: EditorFontParagraph;
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        font-feature-settings: "ss02" 1, "case" 1, "cv09" 1;
        src: url("https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.9")
                format("woff2"),
            url("https://rsms.me/inter/font-files/Inter-Regular.woff?v=3.9")
                format("woff");
    }
    @font-face {
        font-family: EditorFontParagraph;
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        font-feature-settings: "ss02" 1, "case" 1, "cv09" 1;
        src: url("https://rsms.me/inter/font-files/Inter-Italic.woff2?v=3.9")
                format("woff2"),
            url("https://rsms.me/inter/font-files/Inter-Italic.woff?v=3.9")
                format("woff");
    }

    @font-face {
        font-family: EditorFontParagraph;
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        font-feature-settings: "ss02" 1, "case" 1, "cv09" 1;
        src: url("https://rsms.me/inter/font-files/Inter-Bold.woff2?v=3.9")
                format("woff2"),
            url("https://rsms.me/inter/font-files/Inter-Bold.woff?v=3.9")
                format("woff");
    }
    @font-face {
        font-family: EditorFontParagraph;
        font-style: italic;
        font-weight: 700;
        font-display: swap;
        font-feature-settings: "ss02" 1, "case" 1, "cv09" 1;
        src: url("https://rsms.me/inter/font-files/Inter-BoldItalic.woff2?v=3.9")
                format("woff2"),
            url("https://rsms.me/inter/font-files/Inter-BoldItalic.woff?v=3.9")
                format("woff");
    }

    :root {
        --editor-font-header: EditorFontHeader, Helvetica, Arial, "Droid Sans", "SFProDisplay-Bold", ".SFUIDisplay-Bold", "SF Pro Display",-apple-system, BlinkMacSystemFont, sans-serif;
        --editor-font-paragraph: EditorFontParagraph, Helvetica, Arial, "Droid Sans", "SFProDisplay-Bold", ".SFUIDisplay-Bold", "SF Pro Display",-apple-system, BlinkMacSystemFont, sans-serif;
    }

    body {
        font-family: var(--editor-font-paragraph);
        color: var(--fontColor);
        background-color: var(--bgColor);
        transition: background-color 0.4s ease-out;
    }

/*
 * The MIT License
 * Copyright (c) 2012 Matias Meno <m@tias.me>
 */
.dropzone,
.dropzone * {
    box-sizing: border-box;
}

.dropzone {
    position: relative;
}
.dropzone .dz-preview {
    position: relative;
    display: inline-block;
    /*width: 120px;*/
    margin: 0 0.5em;
}
.dropzone .dz-preview .dz-progress {
    display: block;
    height: 15px;
    border: 1px solid #aaa;
}
.dropzone .dz-preview .dz-progress .dz-upload {
    display: block;
    height: 100%;
    width: 0;
    background: green;
}
.dropzone .dz-preview .dz-error-message {
    color: red;
    display: none;
}
.dropzone .dz-preview.dz-error .dz-error-message,
.dropzone .dz-preview.dz-error .dz-error-mark {
    display: block;
}
.dropzone .dz-preview.dz-success .dz-success-mark {
    display: block;
}
.dropzone .dz-preview .dz-error-mark,
.dropzone .dz-preview .dz-success-mark {
    position: absolute;
    display: none;
    left: 30px;
    top: 30px;
    width: 54px;
    height: 58px;
    left: 50%;
    margin-left: -27px;
}

/*
   * The MIT License
   * Copyright (c) 2012 Matias Meno <m@tias.me>
   */
@-webkit-keyframes passing-through {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        -moz-transform: translateY(40px);
        -ms-transform: translateY(40px);
        -o-transform: translateY(40px);
        transform: translateY(40px);
    }
    30%,
    70% {
        opacity: 1;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        -o-transform: translateY(0px);
        transform: translateY(0px);
    }
    100% {
        opacity: 0;
        -webkit-transform: translateY(-40px);
        -moz-transform: translateY(-40px);
        -ms-transform: translateY(-40px);
        -o-transform: translateY(-40px);
        transform: translateY(-40px);
    }
}
@-moz-keyframes passing-through {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        -moz-transform: translateY(40px);
        -ms-transform: translateY(40px);
        -o-transform: translateY(40px);
        transform: translateY(40px);
    }
    30%,
    70% {
        opacity: 1;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        -o-transform: translateY(0px);
        transform: translateY(0px);
    }
    100% {
        opacity: 0;
        -webkit-transform: translateY(-40px);
        -moz-transform: translateY(-40px);
        -ms-transform: translateY(-40px);
        -o-transform: translateY(-40px);
        transform: translateY(-40px);
    }
}
@keyframes passing-through {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        -moz-transform: translateY(40px);
        -ms-transform: translateY(40px);
        -o-transform: translateY(40px);
        transform: translateY(40px);
    }
    30%,
    70% {
        opacity: 1;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        -o-transform: translateY(0px);
        transform: translateY(0px);
    }
    100% {
        opacity: 0;
        -webkit-transform: translateY(-40px);
        -moz-transform: translateY(-40px);
        -ms-transform: translateY(-40px);
        -o-transform: translateY(-40px);
        transform: translateY(-40px);
    }
}
@-webkit-keyframes slide-in {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        -moz-transform: translateY(40px);
        -ms-transform: translateY(40px);
        -o-transform: translateY(40px);
        transform: translateY(40px);
    }
    30% {
        opacity: 1;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        -o-transform: translateY(0px);
        transform: translateY(0px);
    }
}
@-moz-keyframes slide-in {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        -moz-transform: translateY(40px);
        -ms-transform: translateY(40px);
        -o-transform: translateY(40px);
        transform: translateY(40px);
    }
    30% {
        opacity: 1;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        -o-transform: translateY(0px);
        transform: translateY(0px);
    }
}
@keyframes slide-in {
    0% {
        opacity: 0;
        -webkit-transform: translateY(40px);
        -moz-transform: translateY(40px);
        -ms-transform: translateY(40px);
        -o-transform: translateY(40px);
        transform: translateY(40px);
    }
    30% {
        opacity: 1;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        -o-transform: translateY(0px);
        transform: translateY(0px);
    }
}
@-webkit-keyframes pulse {
    0% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }
    10% {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }
    20% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }
}
@-moz-keyframes pulse {
    0% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }
    10% {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }
    20% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }
}
@keyframes pulse {
    0% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }
    10% {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }
    20% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }
}
.dropzone,
.dropzone * {
    box-sizing: border-box;
}

/*.dropzone {
    min-height: 150px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    background: white;
    padding: 20px 20px;
}*/
.dropzone.dz-clickable {
    cursor: pointer;
}
.dropzone.dz-clickable * {
    cursor: default;
}
.dropzone.dz-clickable .dz-message,
.dropzone.dz-clickable .dz-message * {
    cursor: pointer;
}
.dropzone.dz-started .dz-message {
    display: none;
}
.dropzone.dz-drag-hover {
    border-style: solid;
}
.dropzone.dz-drag-hover .dz-message {
    opacity: 0.5;
}
.dropzone .dz-message {
    text-align: center;
    margin: 2em 0;
}
.dropzone .dz-message .dz-button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}
.dropzone .dz-preview {
    position: relative;
    display: inline-block;
    vertical-align: top;
    /*margin: 16px;
    min-height: 100px;*/
}
.dropzone .dz-preview:hover {
    /*z-index: 1000;*/
}
.dropzone .dz-preview:hover .dz-details {
    opacity: 1;
}
.dropzone .dz-preview.dz-file-preview .dz-image {
    border-radius: 20px;
    background: #999;
    background: linear-gradient(to bottom, #eee, #ddd);
}
.dropzone .dz-preview.dz-file-preview .dz-details {
    opacity: 1;
}
.dropzone .dz-preview.dz-image-preview .dz-details {
    -webkit-transition: opacity 0.2s linear;
    -moz-transition: opacity 0.2s linear;
    -ms-transition: opacity 0.2s linear;
    -o-transition: opacity 0.2s linear;
    transition: opacity 0.2s linear;
}
.dropzone .dz-preview .dz-remove {
    font-size: 0.9em;
    text-align: center;
    display: block;
    cursor: pointer;
    border: none;
}
.dropzone .dz-preview .dz-remove:hover {
    text-decoration: underline;
}
.dropzone .dz-preview:hover .dz-details {
    opacity: 1;
}
.dropzone .dz-preview .dz-details {
    /*z-index: 20;*/
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    font-size: 13px;
    min-width: 100%;
    max-width: 100%;
    padding: 2em 1em;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);
    line-height: 150%;
}
.dropzone .dz-preview .dz-details .dz-size {
    margin-bottom: 1em;
    font-size: 16px;
}
.dropzone .dz-preview .dz-details .dz-filename {
    white-space: nowrap;
}
.dropzone .dz-preview .dz-details .dz-filename:hover span {
    border: 1px solid rgba(200, 200, 200, 0.8);
    background-color: rgba(255, 255, 255, 0.8);
}
.dropzone .dz-preview .dz-details .dz-filename:not(:hover) {
    overflow: hidden;
    text-overflow: ellipsis;
}
.dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {
    border: 1px solid transparent;
}
.dropzone .dz-preview .dz-details .dz-filename span,
.dropzone .dz-preview .dz-details .dz-size span {
    background-color: rgba(255, 255, 255, 0.4);
    padding: 0 0.4em;
    border-radius: 3px;
}
.dropzone .dz-preview:hover .dz-image img {
    -webkit-transform: scale(1.05, 1.05);
    -moz-transform: scale(1.05, 1.05);
    -ms-transform: scale(1.05, 1.05);
    -o-transform: scale(1.05, 1.05);
    transform: scale(1.05, 1.05);
    -webkit-filter: blur(8px);
    filter: blur(8px);
}
.dropzone .dz-preview .dz-image {
    border-radius: 20px;
    overflow: hidden;
    width: 6em;
    height: 6em;
    position: relative;
    display: block;
    /*z-index: 10;*/
}
.dropzone .dz-preview .dz-image img {
    display: block;
}
.dropzone .dz-preview.dz-success .dz-success-mark {
    -webkit-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
    -moz-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
    -ms-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
    -o-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
    animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
}
.dropzone .dz-preview.dz-error .dz-error-mark {
    opacity: 1;
    -webkit-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
    -moz-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
    -ms-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
    -o-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
    animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
}
.dropzone .dz-preview .dz-success-mark,
.dropzone .dz-preview .dz-error-mark {
    pointer-events: none;
    opacity: 0;
    /*z-index: 500;*/
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    margin-left: -27px;
    margin-top: -27px;
}
.dropzone .dz-preview .dz-success-mark svg,
.dropzone .dz-preview .dz-error-mark svg {
    display: block;
    width: 54px;
    height: 54px;
}
.dropzone .dz-preview.dz-processing .dz-progress {
    opacity: 1;
    -webkit-transition: all 0.2s linear;
    -moz-transition: all 0.2s linear;
    -ms-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
}
.dropzone .dz-preview.dz-complete .dz-progress {
    opacity: 0;
    -webkit-transition: opacity 0.4s ease-in;
    -moz-transition: opacity 0.4s ease-in;
    -ms-transition: opacity 0.4s ease-in;
    -o-transition: opacity 0.4s ease-in;
    transition: opacity 0.4s ease-in;
}
.dropzone .dz-preview:not(.dz-processing) .dz-progress {
    -webkit-animation: pulse 6s ease infinite;
    -moz-animation: pulse 6s ease infinite;
    -ms-animation: pulse 6s ease infinite;
    -o-animation: pulse 6s ease infinite;
    animation: pulse 6s ease infinite;
}
.dropzone .dz-preview .dz-progress {
    opacity: 1;
    /*z-index: 1000;*/
    pointer-events: none;
    position: absolute;
    height: 16px;
    left: 50%;
    top: 50%;
    margin-top: -8px;
    width: 80px;
    margin-left: -40px;
    background: rgba(255, 255, 255, 0.9);
    -webkit-transform: scale(1);
    border-radius: 8px;
    overflow: hidden;
}
.dropzone .dz-preview .dz-progress .dz-upload {
    background: #333;
    background: linear-gradient(to bottom, #666, #444);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0;
    -webkit-transition: width 300ms ease-in-out;
    -moz-transition: width 300ms ease-in-out;
    -ms-transition: width 300ms ease-in-out;
    -o-transition: width 300ms ease-in-out;
    transition: width 300ms ease-in-out;
}
.dropzone .dz-preview.dz-error .dz-error-message {
    display: block;
}
.dropzone .dz-preview.dz-error:hover .dz-error-message {
    opacity: 1;
    pointer-events: auto;
}
.dropzone .dz-preview .dz-error-message {
    pointer-events: none;
    /*z-index: 1000;*/
    position: absolute;
    display: block;
    display: none;
    opacity: 0;
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition: opacity 0.3s ease;
    border-radius: 8px;
    font-size: 13px;
    top: 130px;
    left: -10px;
    width: 140px;
    background: #be2626;
    background: linear-gradient(to bottom, #be2626, #a92222);
    padding: 0.5em 1.2em;
    color: white;
}
.dropzone .dz-preview .dz-error-message:after {
    content: "";
    position: absolute;
    top: -6px;
    left: 64px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #be2626;
}

div.filepicker {
    text-align: center;
    /*padding: 5px;*/
    borderTop: 1px solid var(--borderColorPanel);
    background-color: var(--bgColorPanel);
    /*border-top-left-radius: 4px;*/
    /*border-top-right-radius: 4px;*/
    /*min-height: 60px;*/
    /*border: 2px solid #c7c7c7;*/
}

/* Icon */
.filepicker-file-icon {
    position: relative;

    display: inline-block;

    margin: 1.5em 0 2.5em 0;
    padding-left: 45px;

    color: black;
}
.filepicker-file-icon::before {
    position: absolute;
    top: -7px;
    left: 0;

    width: 29px;
    height: 34px;

    content: "";

    border: solid 2px #7f7f7f;
    border-radius: 2px;
}
.filepicker-file-icon::after {
    font-size: 11px;
    line-height: 1.3;

    position: absolute;
    top: 9px;
    left: -4px;

    padding: 0 2px;

    content: "file";
    content: attr(data-filetype);
    text-align: right;
    letter-spacing: 1px;
    text-transform: uppercase;

    color: #fff;
    background-color: #000;
}
.filepicker-file-icon .fileCorner {
    position: absolute;
    top: -7px;
    left: 22px;

    width: 0;
    height: 0;

    border-width: 11px 0 0 11px;
    border-style: solid;
    border-color: white transparent transparent #920035;
}


.radio-group .radio-group-option {
    cursor: pointer;
    height: 16px; }
    .radio-group .radio-group-option svg {
      width: 16px;
      height: 16px; }
      .radio-group .radio-group-option svg .radio-group-circle-outer {
        fill: var(--borderColorWE); }
      .radio-group .radio-group-option svg .radio-group-circle {
        fill: var(--bgInput); }
      .radio-group .radio-group-option svg .radio-group-circle-inner {
        visibility: hidden; }
    .radio-group .radio-group-option .radio-group-label {
      padding-left: 4px;
      color: var(--fontColor); }

    .radio-group .radio-group-option.is-checked svg .radio-group-circle-outer {
      fill: #1a91eb; }
    .radio-group .radio-group-option.is-checked svg .radio-group-circle-inner {
      visibility: visible;
      fill: #1a91eb; }

  .radio-group.is-disabled .radio-group-option {
    cursor: not-allowed;
    opacity: 0.6; }

  .radio-group.is-disabled .radio-group-label {
    cursor: auto; }

  .radio-group:not(.is-horizontal) .radio-group-option:not(:last-child) {
    margin-bottom: 16px; }

  .radio-group.is-horizontal .radio-group-option:not(:last-child) {
    margin-right: 16px; }


`;

export default Normalize;
