import React, { Fragment } from "react";

import GlobalStyles from "./GlobalStyles";
import Calculator from "./nDilation/Calculator";
import WindowContext from "./WindowContext";

const App = () => (
    <Fragment>
        <GlobalStyles />
        <WindowContext.Provider
            value={typeof window !== "undefined" ? window : null}
        >
            <Calculator />
        </WindowContext.Provider>
    </Fragment>
);

export default App;
