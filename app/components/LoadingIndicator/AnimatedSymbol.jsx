import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ANIMATION_TIME, INTERVAL, MINIMUM_TIME_VISIBLE } from "./constants";
import getRandomInt from "../../lib/getRandomInt";
import { useWindowContext } from "../WindowContext";

const StyledSymbol = styled.span.attrs(props => ({
    style: {
        flexBasis: `${props.basis}%`,
        margin: `calc(4rem * ${props.offsetTop}) 3px 3px`,
        opacity: props.opacity,
    },
}))`
    white-space: nowrap;
    transition: opacity ${ANIMATION_TIME}ms ease-out;
`;
StyledSymbol.displayName = "StyledSymbol";

const AnimatedSymbol = props => {
    const [opacity, setOpacity] = useState(0);

    const window = useWindowContext();

    useEffect(() => {
        const { setTimeout, clearTimeout } = window;
        let i, j;

        const clearance = 100;

        const timeBeforeFadeIn = props.getRandomInt(clearance);
        const timeVisible = Math.max(
            MINIMUM_TIME_VISIBLE,
            props.getRandomInt(INTERVAL - timeBeforeFadeIn - ANIMATION_TIME)
        );

        i = setTimeout(() => {
            j = setTimeout(() => setOpacity(0), timeVisible);
            setOpacity(1);
        }, timeBeforeFadeIn);

        return () => {
            clearTimeout(i);
            clearTimeout(j);
        };
    }, [props.children]);

    return (
        <StyledSymbol
            basis={props.basis}
            offsetTop={props.offsetTop}
            opacity={opacity}
        >
            {props.children}
        </StyledSymbol>
    );
};

AnimatedSymbol.displayName = "AnimatedSymbol";

AnimatedSymbol.defaultProps = {
    getRandomInt,
};

export default AnimatedSymbol;
