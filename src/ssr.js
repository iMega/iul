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
    // const modules = ["core", "react", "graphql", "apollo", "uuid", "emotion"];
    const modules = ["vendor"];
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
                        href={`/${tag}/iul_logo_0057.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="60x60"
                        href={`/${tag}/iul_logo_0060.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="72x72"
                        href={`/${tag}/iul_logo_0072.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="76x76"
                        href={`/${tag}/iul_logo_0076.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="114x114"
                        href={`/${tag}/iul_logo_0114.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="120x120"
                        href={`/${tag}/iul_logo_0120.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="144x144"
                        href={`/${tag}/iul_logo_0144.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="152x152"
                        href={`/${tag}/iul_logo_0152.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href={`/${tag}/iul_logo_0180.png`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="512x512"
                        href={`/${tag}/iul_logo_0512.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="36x36"
                        href={`/${tag}/iul_logo_0036.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="48x48"
                        href={`/${tag}/iul_logo_0048.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="72x72"
                        href={`/${tag}/iul_logo_0072.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="144x144"
                        href={`/${tag}/iul_logo_0144.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="192x192"
                        href={`/${tag}/iul_logo_0192.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="96x96"
                        href={`/${tag}/iul_logo_0096.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href={`/${tag}/iul_logo_0032.png`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href={`/${tag}/iul_logo_0016.png`}
                    />
                </head>
                <body>
                    <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
                    {modules.map(m => (
                        <script key={m} src={`/${tag}/${m}.js`} />
                    ))}
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
