import React from "react";
import { shallow } from "enzyme";
import TextAreaAutosize from "react-textarea-autosize";

import DilationForm from "../DilationForm";

const defaultSubmitEvent = {
    preventDefault: () => {},
};

const defaultProps = {
    disabled: false,
    onSubmit: jest.fn(),
};

const render = (overwriteProps = {}) =>
    shallow(<DilationForm {...defaultProps} {...overwriteProps} />);

describe("DilationForm", () => {
    it("should render a form", () => {
        const component = render();

        expect(component.exists("StyledForm")).toEqual(true);
    });

    it("should render a label for the textarea", () => {
        const component = render();

        expect(component.exists("StyledLabel[htmlFor='matrix-input']")).toEqual(
            true
        );
    });

    it("should render a textarea", () => {
        const component = render();

        expect(component.find(TextAreaAutosize).prop("name")).toEqual(
            "matrix-input"
        );
    });

    it("should not call onSubmit from props if input is not a matrix", () => {
        const component = render();

        component.find("StyledForm").simulate("submit", defaultSubmitEvent);

        expect(defaultProps.onSubmit.mock.calls.length).toBe(0);
    });

    it("should render an error message if input is not a matrix", () => {
        const component = render();

        component.find("StyledForm").simulate("submit", defaultSubmitEvent);

        expect(component.find("Error").exists()).toEqual(true);

        component
            .find(TextAreaAutosize)
            .simulate("change", { target: { value: "" } });

        expect(component.find("Error").exists()).toEqual(false);
    });

    it("should not call onSubmit if input is not s square matrix", () => {
        const component = render();

        component
            .find(TextAreaAutosize)
            .simulate("change", { target: { value: "1,2,3" } });
        component.find("StyledForm").simulate("submit", defaultSubmitEvent);

        expect(defaultProps.onSubmit.mock.calls.length).toBe(0);
    });

    it("should disable the submit button if disabled prop is true", () => {
        const component = render({ disabled: true });

        expect(component.find("StyledInput").prop("disabled")).toEqual(true);
    });

    const inputValues = [
        "1.5,-2,\n3,4",
        "1.5 -2,\n3, 4",
        "1.5 -2,\n3, 4",
        "1,5 -2\n3\t4",
        "1,5 -2, 3 4,",
    ];

    inputValues.forEach(inputValue => {
        it(`should pass value ${inputValue} from textarea and degree to onSubmit`, () => {
            const component = render();

            component
                .find(TextAreaAutosize)
                .simulate("change", { target: { value: inputValue } });
            component
                .find("input[type='number']")
                .simulate("change", { target: { value: 3 } });
            component.find("StyledForm").simulate("submit", defaultSubmitEvent);

            expect(defaultProps.onSubmit.mock.calls.length).toBe(1);
            expect(defaultProps.onSubmit.mock.calls[0][0]).toEqual([
                1.5,
                -2,
                3,
                4,
            ]);
            expect(defaultProps.onSubmit.mock.calls[0][1]).toEqual(3);
        });
    });

    it("should render a input for the degree", () => {
        const component = render();
        const input = component.find("input[type='number']");
        expect(input.prop("name")).toEqual("degree");
    });

    it("should render a label for the degree input", () => {
        const component = render();

        expect(component.exists("StyledLabel[htmlFor='degree']")).toEqual(true);
    });
});
