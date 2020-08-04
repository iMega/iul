import React from "react";
import {
    ApolloProvider,
    ApolloClient,
    ApolloLink,
    InMemoryCache
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";
// import { Headers } from "node-fetch"; // undefined bind
// global.Headers = require("fetch-headers/headers-es5.min.js");

if (global.Headers == null) {
    global.Headers = require("fetch-headers");
}

import Main from "./Main";

const restLink = new RestLink({
    uri: "/api",
    endpoints: {
        api: {
            uri: "/api",
            responseTransformer: async response => {
                response.blob().then(blob => {
                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "iul.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            }
        }
    },
    credentials: "same-origin"
});

const client = new ApolloClient({
    link: ApolloLink.from([restLink]),
    cache: new InMemoryCache({})
});

const Connection = () => (
    <ApolloProvider client={client}>
        <Main />
    </ApolloProvider>
);

export default Connection;
