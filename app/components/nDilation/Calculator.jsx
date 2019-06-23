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
    const [dilation, setDilation] = useState(null);
    const window = useWindowContext();

    return (
        <div>
            <MatrixInput
                onSubmit={
                    window && createOnSubmitHandler(window.fetch, setDilation)
                }
            />
            {dilation && <div>{JSON.stringify(dilation)}</div>}
        </div>
    );
};

export default Calculator;
