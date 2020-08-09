import styled from "@emotion/styled";

const Bumper = styled.div(
    {
        padding: "0.7em 0"
    },
    props => ({ width: props.$width && `${props.$width}em` })
);

export default Bumper;
