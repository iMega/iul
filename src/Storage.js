import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

const generateDocumentND = gql`
    mutation generateDocument() {
        document()
            @rest(
                type: "document"
                path: "/gendoc"
                method: "POST"
                endpoint: "api"
            ) {
            payload @type(name: "payload")
        }
    }
`;

const generateDocument = graphql(generateDocumentND, {
    name: "generateDocument",
    options: () => ({ errorPolicy: "ignore" })
});

export default compose(generateDocument);
