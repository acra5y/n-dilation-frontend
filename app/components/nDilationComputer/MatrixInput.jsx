import React, { useState } from "react";

const matrixRegex = /^(([+-]?\d+(\.\d+)?),)*([+-]?\d+(\.\d+)?)$/;
const isMatrix = matrixRegex.test.bind(matrixRegex);

const MatrixInput = ({ onSubmit }) => {
    const [input, setInput] = useState("");

    return (
        <form
            onSubmit={ev => {
                ev.preventDefault();

                if (isMatrix(input.replace(/\s/g, ""))) {
                    onSubmit(JSON.parse(`[${input}]`));
                }
            }}
        >
            <label htmlFor="matrix-input">Enter Matrix</label>
            <textarea
                name="matrix-input"
                type="text"
                onChange={ev => setInput(ev.target.value)}
            />
            <input type="submit" value="Compute" />
        </form>
    );
};

export default MatrixInput;
