import React, { useEffect } from "react";
import { act } from "react-dom/test-utils";
import { mount, shallow } from "enzyme";

import DilationForm from "../DilationForm";
import Result from "../Result";
import * as WindowContext from "../../WindowContext";
import * as WasmLoader from "../../WasmLoader";
import * as LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import Calculator from "../Calculator";

const createWindow = (result = {}) => ({
    UnitaryNDilation: jest.fn(() => result),
});
const render = (window = {}) => {
    jest.spyOn(WindowContext, "useWindowContext").mockImplementation(
        () => window
    );
    jest.spyOn(WasmLoader, "default").mockImplementation(({ onLoad }) => {
        useEffect(onLoad, []);
        return null;
    });
    jest.spyOn(LoadingIndicator, "default").mockImplementation(() => null);
    return mount(<Calculator />);
};

describe("Calculator", () => {
    it("should render", () => {
        const component = shallow(<Calculator />);

        expect(component).toMatchSnapshot();
    });

    it("should render form after WasmLoader called init method", () => {
        const component = shallow(<Calculator />);
        component.find("WasmLoader").prop("onLoad")();

        expect(component).toMatchSnapshot();
    });

    describe("on client", () => {
        it("call window.UnitaryNDilation when onSubmit on DilationForm is called", async () => {
            const window = createWindow();
            const component = render(window);

            await act(async () => {
                component.find(DilationForm).prop("onSubmit")();
            });

            expect(window.UnitaryNDilation.mock.calls.length).toEqual(1);
        });

        it("should set isLoading prop during calculation", async () => {
            const window = createWindow();
            const component = render(window);

            window.UnitaryNDilation = () => {
                expect(component.find(DilationForm).prop("disabled")).toEqual(
                    true
                );
                return {};
            };

            expect(component.find(DilationForm).prop("disabled")).toEqual(
                false
            );

            await act(async () => {
                component.find(DilationForm).prop("onSubmit")();
            });

            expect(component.find(DilationForm).prop("disabled")).toEqual(
                false
            );
        });

        it("should render the dilation after calculation", async () => {
            const dilation = [1, 2, 3, 4];
            const component = render(createWindow({ value: dilation }));

            await act(async () => {
                component.find(DilationForm).prop("onSubmit")();
            });
            component.update();

            expect(component.find(Result).prop("dilation")).toEqual(dilation);
        });

        describe("should handle errors", () => {
            it("when window.UnitaryNDilation returns an error", async () => {
                const error = "value must represent a real contraction";
                const component = render(createWindow({ error }));

                await act(async () => {
                    component.find(DilationForm).prop("onSubmit")();
                });
                component.update();

                expect(component.find(Result).prop("validationError")).toEqual(
                    true
                );
                expect(component.find(Result).prop("runtimeError")).toEqual(
                    false
                );
            });

            it("when window.UnitaryNDilation throws an exception", async () => {
                const window = createWindow();
                window.UnitaryNDilation.mockImplementation(() => {
                    throw new Error("Mock Error");
                });
                const component = render(window);

                await act(async () => {
                    component.find(DilationForm).prop("onSubmit")();
                });
                component.update();

                expect(component.find(Result).prop("validationError")).toEqual(
                    false
                );
                expect(component.find(Result).prop("runtimeError")).toEqual(
                    true
                );
            });

            it("and not render dilation from a first calculation if a second calculation throws", async () => {
                const window = createWindow();
                const component = render(window);

                await act(async () => {
                    component.find(DilationForm).prop("onSubmit")();
                });
                component.update();

                window.UnitaryNDilation.mockImplementation(() => {
                    throw new Error("Mock Error");
                });

                await act(async () => {
                    component.find(DilationForm).prop("onSubmit")();
                });
                component.update();

                const result = component.find(Result);
                expect(result.prop("dilation")).toBe(null);
                expect(component.find(Result).prop("validationError")).toEqual(
                    false
                );
                expect(component.find(Result).prop("runtimeError")).toEqual(
                    true
                );
            });
        });
    });
});
