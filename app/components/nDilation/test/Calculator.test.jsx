import React from "react";
import { shallow } from "enzyme";

import MatrixInput from "../MatrixInput";
import Result from "../Result";
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
            const dilation = [1, 2, 3, 4];
            const response = {
                ok: true,
                json: () => Promise.resolve({ value: dilation }),
            };
            const component = render(createWindow(response));
            await component.find(MatrixInput).prop("onSubmit")();
            expect(component.find(Result).prop("dilation")).toEqual(dilation);
        });

        describe("should handle errors", () => {
            it("and not throw an exception if the fetch is not ok", async () => {
                const responseBody = {
                    validationError: {
                        value: ["value must represent a real contraction"],
                    },
                };
                const response = {
                    ok: false,
                    json: () => Promise.resolve(responseBody),
                };
                const component = render(createWindow(response));
                await component.find(MatrixInput).prop("onSubmit")();
                expect(component.find(Result).prop("errorDetails")).toEqual(
                    responseBody
                );
            });

            it("and catch an exception thrown by fetch", async () => {
                const error = new Error("Mock Error");
                const fetch = jest.fn(() => Promise.reject(error));
                const component = render(createWindow(null, fetch));
                await component.find(MatrixInput).prop("onSubmit")();
                expect(component.find(Result).prop("errorDetails")).toEqual(
                    error
                );
            });

            it("and not render dilation from a first fetch if a second fetch throws", async () => {
                const window = createWindow();
                const component = render(window);
                await component.find(MatrixInput).prop("onSubmit")();
                const mockError = new Error("Mock Error");
                window.fetch.mockImplementation(() =>
                    Promise.reject(mockError)
                );
                await component.find(MatrixInput).prop("onSubmit")();
                const result = component.find(Result);
                expect(result.prop("dilation")).toBe(null);
                expect(result.prop("errorDetails")).toEqual(mockError);
            });
        });
    });
});
