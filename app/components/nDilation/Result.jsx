import React from "react";
import styled from "styled-components";

import withAnimatedContentChange from "../withAnimatedContentChange";
import Matrix from "./Matrix";
import ErrorMessage from "./ErrorMessage";

const AnimatedContentTransition = styled.div`
    text-align: center;
    transition: ${(props) =>
        `opacity ${props.animationTimeInSeconds}s ease-out`};
    opacity: ${(props) => props.opacity};
`;

export const Result = ({
    dilation,
    validationError,
    fatalError,
    opacity,
    animationTimeInSeconds,
}) => {
    return (
        <AnimatedContentTransition
            opacity={opacity}
            animationTimeInSeconds={animationTimeInSeconds}
        >
            {dilation && <Matrix matrixInRowMajorOrder={dilation} />}
            {(validationError || fatalError) && (
                <ErrorMessage validationError={validationError} />
            )}
        </AnimatedContentTransition>
    );
};

export default withAnimatedContentChange(Result);
