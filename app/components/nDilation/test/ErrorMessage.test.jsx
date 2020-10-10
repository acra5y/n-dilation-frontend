import React from "react";
import { shallow } from "enzyme";

import ErrorMessage from "../ErrorMessage";

const defaultProps = {
    validationError: false,
};

const render = (overwriteProps) =>
    shallow(<ErrorMessage {...defaultProps} {...overwriteProps} />);

describe("ErrorMessage", () => {
    it("should render", () => {
        const component = render();

        expect(component).toMatchSnapshot();
    });

    it("should render error message for validationError", () => {
        const component = render({
            validationError: true,
        });

        expect(component).toMatchSnapshot();
    });
});
