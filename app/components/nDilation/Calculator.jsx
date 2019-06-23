import React, { useReducer } from "react";

import fetchNDilation from "../../lib/fetchNDilation";
import { useWindowContext } from "../WindowContext";
import MatrixInput from "./MatrixInput";

const initialState = { dilation: null, error: null };

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return { dilation: action.payload, error: null };
        case "FETCH_ERROR":
            return { dilation: null, error: action.payload };
        default:
            return state;
    }
}

const createOnSubmitHandler = (fetch, dispatch) => async matrix => {
    try {
        const response = await fetchNDilation(fetch, matrix);

        if (response.ok) {
            const body = await response.json();
            dispatch({ type: "FETCH_SUCCESS", payload: body.value });
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
            {error && <div>Ooops, something went terribly wrong 🤯</div>}
        </div>
    );
};

export default Calculator;
