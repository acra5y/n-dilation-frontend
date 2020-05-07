import React from "react";

function ErrorMessage({ validationError }) {
    if (!validationError) {
        return (
            <div>
                Ooops, something went terribly wrong 🤯. You will probably have
                to reload the page now.
            </div>
        );
    }

    return (
        <div>
            This did not work. Are you sure, your matrix is a square contraction
            with real numbers? 🤔
        </div>
    );
}

export default ErrorMessage;
