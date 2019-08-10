import React from "react";
import styled from "styled-components";

import withAnimatedContentChange from "../withAnimatedContentChange";
import ErrorMessage from "./ErrorMessage";

const AnimatedContentTransition = styled.div`
    transition: ${props => `opacity ${props.animationTimeInSeconds}s ease-out`};
    opacity: ${props => props.opacity};
`;

export const Result = ({
    dilation,
    errorDetails,
    opacity,
    animationTimeInSeconds,
}) => {
    return (
        <AnimatedContentTransition
            opacity={opacity}
            animationTimeInSeconds={animationTimeInSeconds}
        >
            {dilation && <div>{JSON.stringify(dilation, null, 1)}</div>}
            {errorDetails && <ErrorMessage errorDetails={errorDetails} />}
        </AnimatedContentTransition>
    );
};

export default withAnimatedContentChange(Result);
