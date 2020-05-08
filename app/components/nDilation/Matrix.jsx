import React from "react";
import styled from "styled-components";

const Matrix = styled.div`
    overflow: scroll;
    display: grid;
    grid-gap: 4px;
    grid-template-columns: ${({ dimension }) => `repeat(${dimension}, 1fr);`};
`;
const WrapperWithPaddingOnOverflow = styled.div`
    padding: 0.25rem 0.5rem;
    border-left: 1px solid black;
    border-right: 1px solid black;
    max-width: 95vw;
`;

export default ({ matrixInRowMajorOrder }) => (
    <WrapperWithPaddingOnOverflow>
        <Matrix dimension={Math.round(Math.sqrt(matrixInRowMajorOrder.length))}>
            {matrixInRowMajorOrder.map((entry, i) => (
                <span key={`entry-${i}`}>{entry}</span>
            ))}
        </Matrix>
    </WrapperWithPaddingOnOverflow>
);
