import React from "react";

function ErrorMessage({ errorDetails }) {
    if (!errorDetails.validationError) {
        return <div>Ooops, something went terribly wrong 🤯</div>;
    }

    return (
        <div>
            This did not work. Are you sure, your matrix is a square contraction
            with real numbers? 🤔
        </div>
    );
}

export default ErrorMessage;
