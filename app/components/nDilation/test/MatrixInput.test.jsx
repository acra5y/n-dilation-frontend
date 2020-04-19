import React from "react";
import { shallow } from "enzyme";
import TextAreaAutosize from "react-textarea-autosize";

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

        expect(component.exists("StyledForm")).toEqual(true);
    });

    it("should render a label", () => {
        const component = render();

        expect(component.exists("StyledLabel")).toEqual(true);
        expect(component.find("StyledLabel").prop("htmlFor")).toEqual(
            "matrix-input"
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

    it("should not call onSubmit if input is not s square matrix", () => {
        const component = render();

        component
            .find(TextAreaAutosize)
            .simulate("change", { target: { value: "1,2,3" } });
        component.find("StyledForm").simulate("submit", defaultSubmitEvent);

        expect(defaultProps.onSubmit.mock.calls.length).toBe(0);
    });

    const inputValues = [
        "1.5,-2,\n3,4",
        "1.5 -2,\n3, 4",
        "1.5 -2,\n3, 4",
        "1,5 -2\n3\t4",
        "1,5 -2, 3 4,",
    ];

    inputValues.forEach(inputValue => {
        it(`should pass value ${inputValue} from textarea to onSubmit`, () => {
            const component = render();

            component
                .find(TextAreaAutosize)
                .simulate("change", { target: { value: inputValue } });
            component.find("StyledForm").simulate("submit", defaultSubmitEvent);

            expect(defaultProps.onSubmit.mock.calls.length).toBe(1);
            expect(defaultProps.onSubmit.mock.calls[0][0]).toEqual([
                1.5,
                -2,
                3,
                4,
            ]);
        });
    });
});
