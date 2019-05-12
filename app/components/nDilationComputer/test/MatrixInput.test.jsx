import React from "react";
import { shallow } from "enzyme";

import MatrixInput from "../MatrixInput";

const defaultSubmitEvent = {
    preventDefault: () => {},
};

const defaultProps = {
    onSubmit: jest.fn(),
};

const render = () => shallow(<MatrixInput {...defaultProps} />);

describe("MatrixInput", () => {
    it("should render a form", () => {
        const component = render();

        expect(component.exists("form")).toEqual(true);
    });

    it("should render a label", () => {
        const component = render();

        expect(component.exists("label")).toEqual(true);
        expect(component.find("label").prop("htmlFor")).toEqual("matrix-input");
    });

    it("should render a textarea", () => {
        const component = render();

        expect(component.exists("textarea")).toEqual(true);
        expect(component.find("textarea").prop("name")).toEqual("matrix-input");
    });

    it("should not call onSubmit from props if input is not a matrix", () => {
        const component = render();

        component.find("form").simulate("submit", defaultSubmitEvent);

        expect(defaultProps.onSubmit.mock.calls.length).toBe(0);
    });

    it("should not call onSubmit if input is not s square matrix", () => {
        const component = render();

        component
            .find("textarea")
            .simulate("change", { target: { value: "1,2,3" } });
        component.find("form").simulate("submit", defaultSubmitEvent);

        expect(defaultProps.onSubmit.mock.calls.length).toBe(0);
    });

    it("should pass value from textarea to onSubmit if it is a matrix", () => {
        const component = render();

        component
            .find("textarea")
            .simulate("change", { target: { value: "1.5,-2,\n3,4" } });
        component.find("form").simulate("submit", defaultSubmitEvent);

        expect(defaultProps.onSubmit.mock.calls.length).toBe(1);
        expect(defaultProps.onSubmit.mock.calls[0][0]).toEqual([1.5, -2, 3, 4]);
    });
});
