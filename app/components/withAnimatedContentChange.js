/* eslint-disable */
import React, { useEffect, useReducer } from "react";

const animationTimeInSeconds = 0.1;

function reducer(state, action) {
    switch (action.type) {
        case "BLUR":
            return { ...state, opacity: 0 };
        case "FADE_IN_NEW_VALUE":
            return { ...state, ...action.payload, opacity: 1 };
        default:
            return state;
    }
}

function withAnimatedContentChange(WrappedComponent) {
    function WithAnimatedContentChange(props) {
        const [state, dispatch] = useReducer(reducer, props);

        useEffect(() => {
            dispatch({ type: "BLUR" });
            const i = setTimeout(
                () => dispatch({ type: "FADE_IN_NEW_VALUE", payload: props }),
                animationTimeInSeconds * 1000
            );
            return () => clearTimeout(i);
        }, [props]);

        return (
            <WrappedComponent
                {...state}
                animationTimeInSeconds={animationTimeInSeconds}
            />
        );
    }

    WithAnimatedContentChange.displayName = `withAnimatedContentChange(${
        WrappedComponent.displayName || WrappedComponent.name
    })`;

    return WithAnimatedContentChange;
}

export default withAnimatedContentChange;
