import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { v4 as uuid } from "uuid";
import { window } from "ssr-window";

const list = ({ id }) => {
    const { data, loading } = useQuery(docsND, { variables: { id } });
    return {
        doc: data?.docs.doc || newDoc(),
        loading,
        index: data?.docs.index || []
    };
};

const newDoc = () => {
    const date = new Date().toISOString().slice(0, 10);
    return {
        id: uuid(),
        title:
            "Информационно-удостоверяющий лист для проектно-сметной документации",
        doc: "",
        filename: "",
        num: "1",
        version: "1",
        revision: "1",
        contributors: [
            {
                title: "Разраб.",
                name: "",
                date: date
            },
            {
                title: "",
                name: "",
                date: date
            },
            {
                title: "Н.контр.",
                name: "",
                date: date
            }
        ],
        files: [
            {
                md5: "",
                size: "",
                name: ""
            }
        ]
    };
};

const openDoc = id => JSON.parse(window.localStorage.getItem(id));

const saveDoc = (client, doc) => {
    const s = window.localStorage;
    const raw = s?.getItem("8abd1850-aa55-4be4-8699-4820251ce6de") || "[]";
    const index = JSON.parse(raw);

    const idx = index.findIndex(({ id }) => id === doc.id);
    if (idx >= 0) {
        s.setItem(doc.id, doc);
        index[idx] = makeItemIndex(doc);
    } else {
        const item = makeItemIndex(doc);
        index.unshift(item);
    }
    s.setItem("8abd1850-aa55-4be4-8699-4820251ce6de", JSON.stringify(index));

    s.setItem(doc.id, JSON.stringify(doc));
    client.cache.writeQuery({ query: docsND });

    return doc;
};

const read = (_, { variables }) => {
    const s = window.localStorage;
    const raw = s?.getItem("8abd1850-aa55-4be4-8699-4820251ce6de") || "[]";
    const index = JSON.parse(raw);
    const idx = index.findIndex(({ id }) => id === variables.id);

    let doc = newDoc();
    if (idx >= 0) {
        doc = s.getItem(variables.id);
    }

    return {
        index,
        doc
    };
};

const Documentor = {
    list,
    newDoc,
    openDoc,
    saveDoc,
    read
};

const makeItemIndex = ({ id, title, filename }) => {
    const date = new Date();
    return {
        id,
        title,
        filename,
        date: date.toLocaleDateString()
    };
};

const docsND = gql`
    query GetDocs {
        docs @client
    }
`;

export default Documentor;
export { docsND };
