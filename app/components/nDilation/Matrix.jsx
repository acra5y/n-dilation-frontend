import React from "react";
import styled from "styled-components";

const chunkListIntoPieces = (originalList, chunkLength) =>
    Array.from({ length: chunkLength }).map((chunk, i) =>
        originalList.slice(i * chunkLength, (i + 1) * chunkLength)
    );

const Matrix = styled.div`
    display: inline-grid;
    grid-gap: 4px;
    grid-template-rows: ${({ numberOfRows }) => `repeat(${numberOfRows}, 1fr);`}
    padding: 0.25rem 0.5rem;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 3%;
`;
const Row = styled.div`
    display: inline-grid;
    grid-gap: 4px;
    grid-template-columns: ${({ length }) => `repeat(${length}, 1fr);`};
`;

export default ({ matrixInRowMajorOrder }) => {
    const rows = chunkListIntoPieces(
        matrixInRowMajorOrder,
        Math.round(Math.sqrt(matrixInRowMajorOrder.length))
    );

    return (
        <Matrix numberOfRows={rows.length}>
            {rows.map((row, i) => (
                <Row length={row.length} key={`chunk-${i}`}>
                    {row.map((number, j) => (
                        <span key={j}>{number}</span>
                    ))}
                </Row>
            ))}
        </Matrix>
    );
};
