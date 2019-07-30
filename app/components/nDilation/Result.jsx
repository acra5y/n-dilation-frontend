import React, { Fragment } from "react";

import ErrorMessage from "./ErrorMessage";

const Result = ({ dilation, errorDetails }) => (
    <Fragment>
        {dilation && <div>{JSON.stringify(dilation)}</div>}
        {errorDetails && <ErrorMessage errorDetails={errorDetails} />}
    </Fragment>
);

export default Result;
