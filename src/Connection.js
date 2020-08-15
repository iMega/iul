import React from "react";
import {
    ApolloProvider,
    ApolloClient,
    ApolloLink,
    InMemoryCache
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";

if (global.Headers == null) {
    global.Headers = require("fetch-headers");
}

import Logic from "./Logic";
import Documentor, { docsND } from "./Documentor";

const restLink = new RestLink({
    uri: "/api",
    endpoints: {
        api: {
            uri: "/api",
            responseTransformer: async response => {
                response.blob().then(blob => {
                    console.log("BLOB", blob, response.headers);
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

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: { docs: { read: Documentor.read } }
        }
    }
});

const client = new ApolloClient({
    link: ApolloLink.from([restLink]),
    cache
});

const Connection = () => (
    <ApolloProvider client={client}>
        <Logic />
    </ApolloProvider>
);

export default Connection;
