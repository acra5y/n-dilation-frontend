import React from "react";
import { shallow } from "enzyme";

import MatrixInput from "../MatrixInput";
import * as WindowContext from "../../WindowContext";
import Calculator from "../Calculator";

const createWindow = (
    response = {
        ok: true,
        json: () => Promise.resolve({}),
    }
) => ({
    fetch: jest.fn(() => Promise.resolve(response)),
});
const render = (window = {}) => {
    jest.spyOn(WindowContext, "useWindowContext").mockImplementation(
        () => window
    );
    return shallow(<Calculator />);
};

describe("Calculator", () => {
    it("should render", () => {
        jest.spyOn(WindowContext, "useWindowContext").mockImplementation(
            () => ({})
        );
        const component = render();

        expect(component).toMatchSnapshot();
    });

    describe("on client", () => {
        it("call fetch when onSubmit on MatrixInput is called", async () => {
            const window = createWindow();
            const component = render(window);

            await component.find(MatrixInput).prop("onSubmit")();

            expect(window.fetch.mock.calls.length).toEqual(1);
        });

        it("should render the dilation after is has been fetched", async () => {
            const response = {
                ok: true,
                json: () => Promise.resolve({ value: [1, 2, 3, 4] }),
            };
            const component = render(createWindow(response));
            await component.find(MatrixInput).prop("onSubmit")();
            expect(component).toMatchSnapshot();
        });

        it("should not throw an exception if the fetch is not ok", async () => {
            const response = {
                ok: false,
            };
            const component = render(createWindow(response));
            await component.find(MatrixInput).prop("onSubmit")();
            expect(component).toMatchSnapshot();
        });
    });
});
