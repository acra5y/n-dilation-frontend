import React, { useReducer, useEffect, useRef } from "react";

import { useWindowContext } from "../WindowContext";
import DilationForm from "./DilationForm";
import Result from "./Result";
import WasmLoader from "../WasmLoader";

const initialState = {
    isLoading: false,
    dilation: null,
    validationError: false,
    runtimeError: false,
    ready: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "WASM_INITIALIZED":
            return { ...state, ready: true };
        case "CALCULATE_START":
            return {
                ...state,
                isLoading: true,
                dilation: null,
                runtimeError: false,
                validationError: false,
            };
        case "CALCULATE_OK":
            return {
                ...state,
                isLoading: false,
                dilation: action.payload,
                error: null,
            };
        case "VALIDATION_ERROR":
            return {
                ...state,
                isLoading: false,
                dilation: null,
                runtimeError: false,
                validationError: true,
            };
        case "CALCULATE_ERROR":
            return {
                ...state,
                ready: false,
                isLoading: false,
                dilation: null,
                runtimeError: true,
                validationError: false,
            };
        default:
            return state;
    }
}

const createOnSubmitHandler = (unitaryNDilationAsync, dispatch) => async (
    matrix,
    degree
) => {
    try {
        dispatch({ type: "CALCULATE_START" });
        const { error, value } = await unitaryNDilationAsync(matrix, degree);

        if (!error) {
            dispatch({ type: "CALCULATE_OK", payload: value });
        } else {
            dispatch({ type: "VALIDATION_ERROR", payload: error });
        }
    } catch (e) {
        dispatch({ type: "CALCULATE_ERROR", payload: e });
    }
};

const Calculator = () => {
    const [
        { isLoading, dilation, validationError, runtimeError },
        dispatch,
    ] = useReducer(reducer, initialState);
    const onSubmitHandler = useRef(null);
    const window = useWindowContext();

    useEffect(() => {
        if (!onSubmitHandler.current) {
            const unitaryNDilationAsync = (matrix, degree) =>
                Promise.resolve(window.UnitaryNDilation(matrix, degree));
            onSubmitHandler.current = createOnSubmitHandler(
                unitaryNDilationAsync,
                dispatch
            );
            dispatch({ type: "WASM_INITIALIZED" });
        }
    }, [window && window.UnitaryNDilation]);

    return (
        <div>
            <WasmLoader />
            <DilationForm onSubmit={onSubmitHandler.current} />
            <Result
                isLoading={isLoading}
                validationError={validationError}
                runtimeError={runtimeError}
                dilation={dilation}
            />
        </div>
    );
};

export default Calculator;
