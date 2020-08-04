import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

const generateDocumentND = gql`
    mutation updateFragment($in: Object) {
        document(input: $in)
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

export default generateDocument;
