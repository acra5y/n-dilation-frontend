import React, { useState } from "react";
import styled from "styled-components";
import TextAreaAutosize from "react-textarea-autosize";

const darkGreen = "#4c8f11";
const lightGreen = "#cde843";
const yellow = "#fae56b";
const marginBetweenFormElements = "margin: 8px;";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;
StyledForm.displayName = "StyledForm";

const TextareaWrapper = styled.div`
    background-color: ${darkGreen};
    padding: 2px;
    border-radius: 3px;
    box-shadow: 0 0 2px 2px ${darkGreen};
    ${marginBetweenFormElements}

    & > textarea {
        border: 2px solid ${lightGreen};
        border-radius: 3px;
        min-height: 2rem;
        transition: height ease-out 0.1s;

        &:hover,
        &:focus {
            border-color: ${yellow};
        }
    }
`;
TextareaWrapper.displayName = "TextareaWrapper";

const StyledLabel = styled.label`
    ${marginBetweenFormElements}
`;
StyledLabel.displayName = "StyledLabel";

const StyledInput = styled.input`
    border-radius: 18px;
    border: 2px solid ${darkGreen};
    box-shadow: 0 0 1px 1px ${darkGreen};
    padding: 2px 7px;
    ${marginBetweenFormElements}

    &:hover {
        cursor: pointer;
        border-color: ${lightGreen};
    }

    &:active,
    &:focus {
        cursor: pointer;
        border-color: ${yellow};
    }
    &:disabled {
        cursor: not-allowed;
        border-color: ${darkGreen};
    }
`;
StyledInput.displayName = "StyledInput";

const matrixRegex = /^(([+-]?\d+([.,]\d+)?),?\s*)+$/;
const isMatrix = matrixRegex.test.bind(matrixRegex);
const isSquare = number => number > 0 && Math.sqrt(number) % 1 === 0;

const DilationForm = ({ onSubmit, disabled }) => {
    const [input, setInput] = useState("");
    const [degree, setDegree] = useState(2);

    return (
        <StyledForm
            onSubmit={ev => {
                ev.preventDefault();

                if (isMatrix(input) && degree > 0) {
                    const withDotAsDecimalSeparator = input.replace(
                        /(\d+)([,])(\d+)(\s)+/g,
                        "$1.$3$4"
                    );
                    const matrixArray = withDotAsDecimalSeparator
                        .split(/[,\s]+/)
                        .filter(Boolean)
                        .map(parseFloat);

                    if (isSquare(matrixArray.length)) {
                        onSubmit(matrixArray, degree);
                    }
                }
            }}
        >
            <StyledLabel htmlFor="matrix-input">Enter Matrix</StyledLabel>
            <TextareaWrapper>
                <TextAreaAutosize
                    name="matrix-input"
                    type="text"
                    onChange={ev => setInput(ev.target.value)}
                    autoFocus
                    minRows={2}
                    placeholder="0, 0.5, 0, 0"
                />
            </TextareaWrapper>
            <StyledLabel htmlFor="degree">
                Choose degree of dilation
            </StyledLabel>
            <input
                type="number"
                min="1"
                step="1"
                name="degree"
                onChange={ev => setDegree(parseInt(ev.target.value, 10))}
                value={degree}
            />
            <StyledInput type="submit" value="Compute" disabled={disabled} />
        </StyledForm>
    );
};

export default DilationForm;
