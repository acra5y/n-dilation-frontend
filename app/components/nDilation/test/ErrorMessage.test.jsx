import React from "react";
import { shallow } from "enzyme";

import ErrorMessage from "../ErrorMessage";

const defaultProps = {
    errorDetails: "whatever",
};

const render = overrideProps =>
    shallow(<ErrorMessage {...defaultProps} {...overrideProps} />);

describe("ErrorMessage", () => {
    it("should render", () => {
        const component = render();

        expect(component).toMatchSnapshot();
    });

    it("should render error message for validation errors", () => {
        const component = render({
            errorDetails: { validationError: "whatever" },
        });

        expect(component).toMatchSnapshot();
    });
});
