const fs = require("fs");

import React from "react";
import ReactDOM from "react-dom/server";
import { extractCritical } from "emotion-server";
import { renderToStringWithData } from "@apollo/client/react/ssr";

import Connection from "./Connection";
import Normalize from "./Normalize.js";

const r = renderToStringWithData(<Connection />).then(content => {
    const { ids, css, html } = extractCritical(content);
    const tag = process.env.TAG || "latest";
    return ReactDOM.renderToString(
        <React.Fragment>
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <meta name="robots" content="noindex, nofollow" />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1"
                    />
                    <Normalize />
                    <style
                        data-emotion-css={ids.join(" ")}
                        dangerouslySetInnerHTML={{ __html: css }}
                    />
                    <title>Создать ИУЛ</title>
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="apple-touch-icon"
                        sizes="57x57"
                        href={`/${tag}/apple-icon-57x57.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="60x60"
                        href={`/${tag}/apple-icon-60x60.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="72x72"
                        href={`/${tag}/apple-icon-72x72.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="76x76"
                        href={`/${tag}/apple-icon-76x76.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="114x114"
                        href={`/${tag}/apple-icon-114x114.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="120x120"
                        href={`/${tag}/apple-icon-120x120.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="144x144"
                        href={`/${tag}/apple-icon-144x144.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="152x152"
                        href={`/${tag}/apple-icon-152x152.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href={`/${tag}/apple-icon-180x180.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="512x512"
                        href={`/${tag}/apple-icon-512x512.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="36x36"
                        href={`/${tag}/android-icon-36x36.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="48x48"
                        href={`/${tag}/android-icon-48x48.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="72x72"
                        href={`/${tag}/android-icon-72x72.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="144x144"
                        href={`/${tag}/android-icon-144x144.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="192x192"
                        href={`/${tag}/android-icon-192x192.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="96x96"
                        href={`/${tag}/favicon-96x96.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href={`/${tag}/favicon-32x32.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href={`/${tag}/favicon-16x16.png`}
                    />
                </head>
                <body>
                    <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
                    <script src={`/${tag}/vendor.js`} />
                    <script src={`/${tag}/client.js`} />
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
