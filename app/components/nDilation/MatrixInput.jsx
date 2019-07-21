import React, { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
StyledForm.displayName = "StyledForm";

const TextareaWrapper = styled.div`
    background-color: #4c8f11;
    padding: 2px;
    border-radius: 3px;
    box-shadow: 0 0 2px 2px #4c8f11;
`;
TextareaWrapper.displayName = "TextareaWrapper";

const StyledTextarea = styled.textarea`
    border: 2px solid #cde843;
    border-radius: 3px;

    &:hover,
    &:focus {
        border-color: #fae56b;
    }
`;
StyledTextarea.displayName = "StyledTextarea";

const matrixRegex = /^(([+-]?\d+(\.\d+)?),)*([+-]?\d+(\.\d+)?)$/;
const isMatrix = matrixRegex.test.bind(matrixRegex);
const isSquare = number => number > 0 && Math.sqrt(number) % 1 === 0;

const MatrixInput = ({ onSubmit }) => {
    const [input, setInput] = useState("");

    return (
        <StyledForm
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
                <StyledTextarea
                    name="matrix-input"
                    type="text"
                    onChange={ev => setInput(ev.target.value)}
                    autoFocus
                    rows={2}
                    placeholder="0, 0.5, 0, 0"
                />
            </TextareaWrapper>
            <input type="submit" value="Compute" />
        </StyledForm>
    );
};

export default MatrixInput;
