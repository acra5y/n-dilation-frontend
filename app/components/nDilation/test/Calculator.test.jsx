import React from "react";
import { shallow } from "enzyme";

import MatrixInput from "../MatrixInput";
import ErrorMessage from "../ErrorMessage";
import * as WindowContext from "../../WindowContext";
import Calculator from "../Calculator";

const createWindow = (
    response = {
        ok: true,
        json: () => Promise.resolve({}),
    },
    fetch = jest.fn(() => Promise.resolve(response))
) => ({
    fetch,
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

        describe("should handle errors", () => {
            it("and not throw an exception if the fetch is not ok", async () => {
                const response = {
                    ok: false,
                };
                const component = render(createWindow(response));
                await component.find(MatrixInput).prop("onSubmit")();
                expect(component).toMatchSnapshot();
            });

            it("and catch an exception thrown by fetch", async () => {
                const error = new Error("Mock Error");
                const fetch = jest.fn(() => Promise.reject(error));
                const component = render(createWindow(null, fetch));
                await component.find(MatrixInput).prop("onSubmit")();
                expect(component.find(ErrorMessage).exists()).toEqual(true);
            });

            it("and not render dilation from a first fetch if a second fetch throws", async () => {
                const window = createWindow();
                const component = render(window);
                await component.find(MatrixInput).prop("onSubmit")();
                window.fetch.mockImplementation(() =>
                    Promise.reject(new Error("Mock Error"))
                );
                await component.find(MatrixInput).prop("onSubmit")();
                expect(component).toMatchSnapshot();
            });
        });
    });
});
