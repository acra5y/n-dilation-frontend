import React, { useState } from "react";

import fetchNDilation from "../../lib/fetchNDilation";
import { useWindowContext } from "../WindowContext";
import MatrixInput from "./MatrixInput";

const createOnSubmitHandler = (
    fetch,
    setDilation,
    setError
) => async matrix => {
    try {
        const response = await fetchNDilation(fetch, matrix);

        if (response.ok) {
            const body = await response.json();
            setDilation(body.value);
        }
    } catch (e) {
        setDilation(null);
        setError(e);
    }
};

const Calculator = () => {
    const [dilation, setDilation] = useState(null);
    const [error, setError] = useState(null);
    const window = useWindowContext();

    return (
        <div>
            <MatrixInput
                onSubmit={
                    window &&
                    createOnSubmitHandler(window.fetch, setDilation, setError)
                }
            />
            {dilation && <div>{JSON.stringify(dilation)}</div>}
            {error && <div>Ooops, something went terribly wrong 🤯</div>}
        </div>
    );
};

export default Calculator;
