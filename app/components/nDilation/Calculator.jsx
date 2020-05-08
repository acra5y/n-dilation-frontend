import React, { useReducer, useEffect } from "react";
import styled from "styled-components";

import { useWindowContext } from "../WindowContext";
import DilationForm from "./DilationForm";
import Result from "./Result";
import WasmLoader from "../WasmLoader";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const initialState = {
    isLoading: false,
    dilation: null,
    initError: false,
    validationError: false,
    runtimeError: false,
    ready: false,
    matrix: null,
    degree: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "WASM_INITIALIZED":
            return { ...state, ready: true };
        case "INIT_ERROR":
            return { ...state, initError: true };
        case "CALCULATE_START":
            return {
                ...state,
                isLoading: true,
                dilation: null,
                runtimeError: false,
                validationError: false,
                matrix: action.matrix,
                degree: action.degree,
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
                validationError: true,
            };
        case "CALCULATE_ERROR":
            return {
                ...state,
                isLoading: false,
                runtimeError: true,
            };
        default:
            return state;
    }
}

const StyledLoadingIndicator = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Calculator = () => {
    const [
        {
            isLoading,
            dilation,
            validationError,
            initError,
            runtimeError,
            matrix,
            degree,
            ready,
        },
        dispatch,
    ] = useReducer(reducer, initialState);
    const window = useWindowContext();

    useEffect(() => {
        if (isLoading) {
            try {
                const { error, value } = window.UnitaryNDilation(
                    matrix,
                    degree
                );

                if (!error) {
                    dispatch({ type: "CALCULATE_OK", payload: value });
                } else {
                    dispatch({ type: "VALIDATION_ERROR" });
                }
            } catch (e) {
                dispatch({ type: "CALCULATE_ERROR" });
            }
        }
    }, [isLoading]);

    if (!ready && !initError) {
        return (
            <StyledLoadingIndicator>
                <WasmLoader
                    onLoad={() => dispatch({ type: "WASM_INITIALIZED" })}
                    onError={() => dispatch({ type: "INIT_ERROR" })}
                />
                <LoadingIndicator />
            </StyledLoadingIndicator>
        );
    }

    return (
        <div>
            <DilationForm
                onSubmit={(matrix, degree) =>
                    dispatch({ type: "CALCULATE_START", matrix, degree })
                }
                disabled={isLoading}
            />
            <Result
                validationError={validationError}
                fatalError={runtimeError || initError}
                dilation={dilation}
            />
        </div>
    );
};

export default Calculator;
