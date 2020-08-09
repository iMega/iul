import React from "react";
import { persistCache } from "apollo-cache-persist";
import { gql } from "@apollo/client";

const docsND = gql`
    query GetDocs {
        docs @client
    }
`;

const PersistStorage = props => {
    console.log("PersistStorage", props);
    const [isPersisted, setIsPersisted] = React.useState();
    // React.useEffect(() => {
    //     async function hydrate() {
    //         await persistCache({
    //             cache: props.cache,
    //             storage: window.localStorage
    //         });
    //         setIsPersisted(true);
    //         console.log("PersistStorage2", isPersisted, props);
    //     }
    //     hydrate();
    // }, []);

    if (isPersisted === true) {
        console.log("PersistStorage3", isPersisted, props);
        props.client.writeQuery({
            query,
            data: {
                todos: [...data.todos, myNewTodo]
            }
        });
        return <div>111</div>;
    }

    props.writeQuery({
        docsND,
        data: {
            todos: [{ id: 111 }]
        }
    });

    return props.children;
};

export default PersistStorage;
