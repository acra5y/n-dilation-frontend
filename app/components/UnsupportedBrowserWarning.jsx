import React from "react";
import styled from "styled-components";

const div = styled.div`
    margin: auto;
    text-align: center;
`;

export default () => {
    return (
        <div>
            <p>
                Unfortunately, the page does not work in the browser you are
                using.
            </p>
            <p>
                Consider installing for example the latest version of Firefox to
                make it work.
            </p>
        </div>
    );
};
