import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { MAX_SYMBOLS, INTERVAL } from "./constants";
import getRandomInt from "../../lib/getRandomInt";
import { useWindowContext } from "../WindowContext";
import AnimatedSymbol from "./AnimatedSymbol";

const symbolSet = [
    "∑",
    "±",
    "∆",
    "≤",
    "≈",
    "√",
    "∫",
    "~",
    "µ",
    "∞",
    "…",
    "| T |",
    "×",
    "∏",
    "|| x ||",
    "sup",
    "<x,y>",
    "T*",
    "dim(T)",
    "∃",
    "∀",
    "Re(z)",
    "Im(z)",
    "α1,...,αk",
    "|ε|=1",
    "λ",
    "j→∞",
    "ζ",
];

const getRandomSymbols = (getRandomIntFromProps) => {
    const amountOfSymbols = getRandomIntFromProps(MAX_SYMBOLS) + 1;

    return Array.from(Array(amountOfSymbols)).map(
        () => symbolSet[getRandomIntFromProps(symbolSet.length - 1)]
    );
};

const LoadingIndicatorWrapper = styled.div`
    display: flex;
    flex-direction: row ${({ reverse }) => (reverse ? "-reverse" : "")};
    flex-wrap: nowrap;
    height: 5rem;
    width: 300px;
`;

const LoadingIndicator = (props) => {
    const getRandomIntRef = useRef((arg) => arg - 1);
    const [symbols, setSymbols] = useState(
        getRandomSymbols(getRandomIntRef.current)
    );
    const window = useWindowContext();

    useEffect(() => {
        const { setInterval, clearInterval } = window;
        getRandomIntRef.current = props.getRandomInt;
        const i = setInterval(
            () => setSymbols(getRandomSymbols(getRandomIntRef.current)),
            INTERVAL
        );

        return () => clearInterval(i);
    }, []);

    return (
        <LoadingIndicatorWrapper reverse={Boolean(getRandomIntRef.current(2))}>
            {symbols.map((symbol, index) => {
                const basis = getRandomIntRef.current(100 / symbols.length);
                const offsetTop = 1 / (getRandomIntRef.current(100) + 1);

                return (
                    <AnimatedSymbol
                        key={`loading-${index}`}
                        basis={basis}
                        offsetTop={offsetTop}
                    >
                        {symbol}
                    </AnimatedSymbol>
                );
            })}
        </LoadingIndicatorWrapper>
    );
};

LoadingIndicator.displayName = "LoadingIndicator";

LoadingIndicator.defaultProps = {
    getRandomInt,
};

export default LoadingIndicator;
