import styled from "@emotion/styled";

const Area = styled.div({}, props => {
    let p = {};
    for (const [key, value] of Object.entries(props)) {
        if (typeof value === "string") {
            Object.assign(p, { [key]: value });
        }
    }
    return p;
});

export default Area;
