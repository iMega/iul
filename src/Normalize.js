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




    .dzu-dropzone1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: 120px;
        overflow: scroll;
        margin: 0 auto;
        position: relative;
        box-sizing: border-box;
        transition: all .15s linear;
        border: 2px solid #d9d9d9;
        border-radius: 4px;
      }

      .dzu-dropzoneActive1 {
        background-color: #DEEBFF;
        border-color: #2484FF;
      }

      .dzu-dropzoneDisabled1 {
        opacity: 0.5;
      }

      /*.dzu-dropzoneDisabled *:hover {
        cursor: unset;
      }*/

      .dzu-input {
        display: none;
      }

      .dzu-inputLabel {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        font-family: 'Helvetica', sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: #2484FF;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        cursor: pointer;
      }

      .dzu-inputLabelWithFiles1 {
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: flex-start;
        padding: 0 14px;
        min-height: 32px;
        background-color: #E6E6E6;
        color: #2484FF;
        border: none;
        font-family: 'Helvetica', sans-serif;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
        margin-top: 20px;
        margin-left: 3%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        cursor: pointer;
      }

      .dzu-previewContainer {
        position: absolute;
        background-color: var(--bgColorPanel);
        top: 0;
        bottom: 0;
        display: grid;
        width: 100%;
        align-content: center;
        grid-template-columns: repeat(auto-fill, minmax(16em, 1fr));
        padding: 0.5em;
        box-sizing: border-box;
        grid-gap: 0.5em;
      }

      .dzu-previewStatusContainer {
        display: flex;
        align-items: center;
        justify-content: end;
      }

      .dzu-previewFileName {
        font-family: 'Helvetica', sans-serif;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
      }

      .dzu-previewImage {
        width: auto;
        max-height: 40px;
        max-width: 140px;
        border-radius: 4px;
      }

      .dzu-previewButton {
        background-size: 14px 14px;
        background-position: center;
        background-repeat: no-repeat;
        width: 14px;
        height: 14px;
        cursor: pointer;
        opacity: 0.9;
        margin: 0 0 2px 10px;
      }

      .dzu-submitButtonContainer1 {
        margin: 24px 0;
        z-index: 1;
      }

      .dzu-submitButton1 {
        padding: 0 14px;
        min-height: 32px;
        background-color: #2484FF;
        border: none;
        border-radius: 4px;
        font-family: 'Helvetica', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #FFF;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        cursor: pointer;
      }

      /*.dzu-submitButton:disabled {
        background-color: #E6E6E6;
        color: #333333;
        cursor: unset;
      }*/


`;

export default Normalize;
