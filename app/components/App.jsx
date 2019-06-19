import React from "react";

import Calculator from "./nDilation/Calculator";
import WindowContext from "./WindowContext";

const App = () => (
    <WindowContext.Provider
        value={typeof window !== "undefined" ? window : null}
    >
        <Calculator />
    </WindowContext.Provider>
);

export default App;
