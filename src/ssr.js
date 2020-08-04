const fs = require("fs");

import React from "react";
import ReactDOM from "react-dom/server";
import { extractCritical } from "emotion-server";
import { renderToStringWithData } from "@apollo/client/react/ssr";

import Connection from "./Connection";
import Normalize from "./Normalize.js";

const r = renderToStringWithData(<Connection />).then(content => {
    // const cache = apolloClient.extract();
    const { ids, css, html } = extractCritical(content);
    // const srcLink = CLIENT_COMP_URI;
    // const env = {
    //     STYLES_NAMESPACE: "__ids"
    // };

    return ReactDOM.renderToString(
        <React.Fragment>
            <html>
                <head>
                    <Normalize />
                    <style
                        data-emotion-css={ids.join(" ")}
                        dangerouslySetInnerHTML={{ __html: css }}
                    />
                </head>
                <body>
                    <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
                    <script src="/vendor.js" />
                    <script src="/client.js" />
                </body>
            </html>
        </React.Fragment>
    );
});

r.then(res => {
    fs.writeFile("./dist/index.htm", `<!DOCTYPE html>${res}`, function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("The file was saved!");
    });
}).catch(err => console.error(err));
