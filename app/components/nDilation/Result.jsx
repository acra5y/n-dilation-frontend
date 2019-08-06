import React, { useEffect, useReducer } from "react";
import styled from "styled-components";

import ErrorMessage from "./ErrorMessage";

const animationTimeInSeconds = 0.1;

const AnimatedContentTransition = styled.div`
    transition: opacity ${animationTimeInSeconds}s ease-out;
    opacity: ${props => props.opacity};
`;

function reducer(state, action) {
    switch (action.type) {
        case "BLUR":
            return { ...state, opacity: 0 };
        case "FADE_IN_NEW_VALUE":
            return { ...action.payload, opacity: 1 };
        default:
            return state;
    }
}

const Result = props => {
    const [{ dilation, errorDetails, opacity }, dispatch] = useReducer(
        reducer,
        props
    );

    useEffect(() => {
        dispatch({ type: "BLUR" });
        const i = setTimeout(
            () => dispatch({ type: "FADE_IN_NEW_VALUE", payload: props }),
            animationTimeInSeconds * 1000
        );
        return () => clearTimeout(i);
    }, [props]);

    return (
        <AnimatedContentTransition opacity={opacity}>
            {dilation && <div>{JSON.stringify(dilation, null, 1)}</div>}
            {errorDetails && <ErrorMessage errorDetails={errorDetails} />}
        </AnimatedContentTransition>
    );
};

export default Result;
