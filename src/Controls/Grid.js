import styled from "@emotion/styled";

const Grid = styled.div(
    {
        display: "grid",
        backgroundColor: "var(--bgColorPanel)",
        borderRadius: "4px",
        border: "1px solid",
        borderColor: "var(--borderColorPanel)",
        boxSizing: "border-box"
    },
    props => {
        let p = {};
        for (const [key, value] of Object.entries(props)) {
            if (typeof value === "string") {
                Object.assign(p, { [key]: value });
            }
        }
        return p;
    }
);

export default Grid;
