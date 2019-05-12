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

    it("should call onSubmit from props", () => {
        const component = render();

        component.find("form").simulate("submit", defaultSubmitEvent);

        expect(defaultProps.onSubmit.mock.calls.length).toBe(1);
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

    it("should pass value from textarea to onSubmit", () => {
        const component = render();

        component
            .find("textarea")
            .simulate("change", { target: { value: "my-input" } });
        component.find("form").simulate("submit", defaultSubmitEvent);

        expect(defaultProps.onSubmit.mock.calls[0][0]).toEqual("my-input");
    });
});
