import React, { Fragment } from "react";

import GlobalStyles from "./GlobalStyles";
import Calculator from "./nDilation/Calculator";
import WindowContext from "./WindowContext";
import UnsupportedBrowserWarning from "./UnsupportedBrowserWarning";

function isBrowserSupported() {
    if (typeof navigator === "undefined") {
        return true;
    }
    const isSafari = navigator.userAgent.indexOf("Safari") != -1;
    const isIE =
        navigator.userAgent.indexOf("MSIE") != -1 ||
        !!document.documentMode == true;

    return !(isSafari || isIE);
}

const App = () => (
    <Fragment>
        <GlobalStyles />
        <WindowContext.Provider
            value={typeof window !== "undefined" ? window : null}
        >
            {isBrowserSupported() ? (
                <Calculator />
            ) : (
                <UnsupportedBrowserWarning />
            )}
        </WindowContext.Provider>
    </Fragment>
);

export default App;
