import React from "react";
import styled from "styled-components";

import withAnimatedContentChange from "../withAnimatedContentChange";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import Matrix from "./Matrix";
import ErrorMessage from "./ErrorMessage";

const AnimatedContentTransition = styled.div`
    text-align: center;
    transition: ${props => `opacity ${props.animationTimeInSeconds}s ease-out`};
    opacity: ${props => props.opacity};
`;

export const Result = ({
    isLoading,
    dilation,
    validationError,
    runtimeError,
    opacity,
    animationTimeInSeconds,
}) => {
    return (
        <AnimatedContentTransition
            opacity={opacity}
            animationTimeInSeconds={animationTimeInSeconds}
        >
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    {dilation && <Matrix matrixInRowMajorOrder={dilation} />}
                    {validationError ||
                        (runtimeError && (
                            <ErrorMessage validationError={validationError} />
                        ))}
                </>
            )}
        </AnimatedContentTransition>
    );
};

export default withAnimatedContentChange(Result);
