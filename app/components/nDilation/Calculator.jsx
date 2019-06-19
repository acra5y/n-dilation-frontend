import React, { useState } from "react";

import fetchNDilation from "../../lib/fetchNDilation";
import { useWindowContext } from "../WindowContext";
import MatrixInput from "./MatrixInput";

const createOnSubmitHandler = (fetch, setDilation) => async matrix => {
    const response = await fetchNDilation(fetch, matrix);

    if (response.ok) {
        const body = await response.json();
        setDilation(body.value);
    }
};

const Calculator = () => {
    const [dilation, setDilation] = useState(null); //eslint-disable-line no-unused-vars
    const window = useWindowContext();

    return (
        <MatrixInput
            onSubmit={
                window && createOnSubmitHandler(window.fetch, setDilation)
            }
        />
    );
};

export default Calculator;
