import React, { useState } from "react";

const MatrixInput = ({ onSubmit }) => {
    const [input, setInput] = useState("");

    return (
        <form
            onSubmit={ev => {
                ev.preventDefault();
                onSubmit(input);
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
