import React, { useState } from "react";

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
            <textarea
                name="matrix-input"
                type="text"
                onChange={ev => setInput(ev.target.value)}
                autoFocus
            />
            <input type="submit" value="Compute" />
        </form>
    );
};

export default MatrixInput;
