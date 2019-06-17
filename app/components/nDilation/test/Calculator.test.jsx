import React from "react";
import { shallow } from "enzyme";

import MatrixInput from "../MatrixInput";
import Calculator from "../Calculator";

describe("Calculator", () => {
    it("should render", () => {
        const component = shallow(<Calculator />);

        expect(component).toMatchSnapshot();
    });

    describe("on client", () => {
        it("should render MatrixInput with correct mockOnSubmit handler", async () => {
            const response = {
                ok: true,
                json: () => Promise.resolve({}),
            };
            global.window = {
                fetch: jest.fn(() => Promise.resolve(response)),
            };
            const component = shallow(<Calculator />);

            await component.find(MatrixInput).simulate("submit");

            expect(window.fetch.mock.calls.length).toEqual(1);
        });
    });
});
