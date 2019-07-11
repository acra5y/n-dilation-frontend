import React, { useState } from "react";
import styled from "styled-components";

const TextareaWrapper = styled.div`
    display: inline-block;
    background-color: #4c8f11;
    padding: 2px;
    border-radius: 3px;
    box-shadow: 0 0 2px 2px #4c8f11;
`;
TextareaWrapper.displayName = "TextareaWrapper";

const Textarea = styled.textarea`
    border: 2px solid #cde843;
    border-radius: 3px;

    &:hover,
    &:focus {
        border-color: #fae56b;
    }
`;
Textarea.displayName = "Textarea";

const matrixRegex = /^(([+-]?\d+(\.\d+)?),)*([+-]?\d+(\.\d+)?)$/;
const isMatrix = matrixRegex.test.bind(matrixRegex);
const isSquare = number => number > 0 && Math.sqrt(number) % 1 === 0;

const MatrixInput = ({ onSubmit }) => {
    const [input, setInput] = useState("");

    return (
        <form
            onSubmit={ev => {
                ev.preventDefault();

                if (isMatrix(input.replace(/\s/g, ""))) {
                    const parsed = JSON.parse(`[${input}]`);

                    if (isSquare(parsed.length)) {
                        onSubmit(parsed);
                    }
                }
            }}
        >
            <label htmlFor="matrix-input">Enter Matrix</label>
            <TextareaWrapper>
                <Textarea
                    name="matrix-input"
                    type="text"
                    onChange={ev => setInput(ev.target.value)}
                    autoFocus
                />
            </TextareaWrapper>
            <input type="submit" value="Compute" />
        </form>
    );
};

export default MatrixInput;
