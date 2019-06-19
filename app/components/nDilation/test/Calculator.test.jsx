import React from "react";
import { shallow } from "enzyme";

import MatrixInput from "../MatrixInput";
import * as WindowContext from "../../WindowContext";
import Calculator from "../Calculator";

describe("Calculator", () => {
    it("should render", () => {
        jest.spyOn(WindowContext, "useWindowContext").mockImplementation(
            () => ({})
        );
        const component = shallow(<Calculator />);

        expect(component).toMatchSnapshot();
    });

    describe("on client", () => {
        it("call fetch when onSubmit on MatrixInput is called", async () => {
            const response = {
                ok: true,
                json: () => Promise.resolve({}),
            };
            const window = {
                fetch: jest.fn(() => Promise.resolve(response)),
            };
            jest.spyOn(WindowContext, "useWindowContext").mockImplementation(
                () => window
            );
            const component = shallow(<Calculator />);

            await component.find(MatrixInput).prop("onSubmit")();

            expect(window.fetch.mock.calls.length).toEqual(1);
        });
    });
});
