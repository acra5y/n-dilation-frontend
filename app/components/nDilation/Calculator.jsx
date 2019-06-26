import React, { useReducer } from "react";

import fetchNDilation from "../../lib/fetchNDilation";
import { useWindowContext } from "../WindowContext";
import MatrixInput from "./MatrixInput";
import ErrorMessage from "./ErrorMessage";

const initialState = { dilation: null, error: null };

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_OK":
            return { dilation: action.payload, error: null };
        case "FETCH_NOT_OK":
            return { dilation: null, error: action.payload };
        case "FETCH_ERROR":
            return { dilation: null, error: action.payload };
        default:
            return state;
    }
}

const createOnSubmitHandler = (fetch, dispatch) => async matrix => {
    try {
        const response = await fetchNDilation(fetch, matrix);

        const body = await response.json();
        if (response.ok) {
            dispatch({ type: "FETCH_OK", payload: body.value });
        } else {
            dispatch({ type: "FETCH_NOT_OK", payload: body });
        }
    } catch (e) {
        dispatch({ type: "FETCH_ERROR", payload: e });
    }
};

const Calculator = () => {
    const [{ dilation, error }, dispatch] = useReducer(reducer, initialState);
    const window = useWindowContext();

    return (
        <div>
            <MatrixInput
                onSubmit={
                    window && createOnSubmitHandler(window.fetch, dispatch)
                }
            />
            {dilation && <div>{JSON.stringify(dilation)}</div>}
            {error && <ErrorMessage errorDetails={error} />}
        </div>
    );
};

export default Calculator;
