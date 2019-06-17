import React, { useState } from "react";

import fetchNDilation from "../../lib/fetchNDilation";
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
    const onSubmit =
        typeof window !== "undefined" &&
        createOnSubmitHandler(window.fetch, setDilation); //eslint-disable-line no-undef

    return <MatrixInput onSubmit={onSubmit} />;
};

export default Calculator;
