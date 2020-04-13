import React from "react";
import { shallow, mount } from "enzyme";

import * as WindowContext from "../../WindowContext";
import AnimatedSymbol from "../AnimatedSymbol";

const createWindow = (
    setTimeout = jest.fn(cb => {
        cb();
        return "some-id";
    }),
    clearTimeout = jest.fn()
) => ({
    setTimeout,
    clearTimeout,
});

const defaultProps = {
    basis: 100,
    offsetTop: 20,
};

const render = (overwriteProps, window, renderMethod = mount) => {
    jest.spyOn(WindowContext, "useWindowContext").mockImplementation(
        () => window
    );
    return renderMethod(
        <AnimatedSymbol {...defaultProps} {...overwriteProps}>
            some-symbol
        </AnimatedSymbol>
    );
};

describe("AnimatedSymbol", () => {
    it("should render children with correct initial styles", () => {
        const component = render({}, undefined, shallow);
        expect(component).toMatchSnapshot();
    });

    it("should set different opacity after random timeout", () => {
        const window = createWindow();
        const randomTimeout = 1;
        const getRandomInt = jest
            .fn()
            .mockReturnValueOnce(randomTimeout)
            .mockReturnValue(501);
        const component = render({ getRandomInt }, window);

        const styledSymbol = component.find("StyledSymbol");

        expect(styledSymbol.prop("opacity")).toEqual(1);
        expect(window.setTimeout.mock.calls[0][1]).toBe(randomTimeout);
    });

    it("should reset opacity after second random timeout", () => {
        const window = createWindow();
        const randomTimeout = 1;
        const getRandomInt = jest
            .fn()
            .mockReturnValueOnce(randomTimeout)
            .mockReturnValue(501);
        const component = render({ getRandomInt }, window);

        component.update();

        const styledSymbol = component.find("StyledSymbol");

        expect(styledSymbol.prop("opacity")).toEqual(1);
        expect(window.setTimeout.mock.calls[1][1]).toBe(501);

        expect(window.setTimeout.mock.calls.length).toEqual(2);
        expect(getRandomInt.mock.calls).toEqual([[100], [899]]);
    });

    it("call get random int with correct upper bounds", () => {
        const window = createWindow();
        const randomTimeout = 1;
        const getRandomInt = jest
            .fn()
            .mockReturnValueOnce(randomTimeout)
            .mockReturnValue(501);
        const staticClearanceValue = 100;
        const staticIntervalMinusAnimationTime = 899;
        render({ getRandomInt }, window);

        expect(getRandomInt.mock.calls).toEqual([
            [staticClearanceValue],
            [staticIntervalMinusAnimationTime],
        ]);
    });

    it("should blur again when children are replaced", () => {
        const window = createWindow();
        const randomTimeout = 1;
        const getRandomInt = jest.fn(() => randomTimeout);
        const component = render({ getRandomInt }, window);

        component.setProps({ children: "other-children" });

        expect(window.setTimeout.mock.calls.length).toEqual(4);
    });

    it("should clear timeouts on unmount", () => {
        const window = createWindow();
        window.setTimeout
            .mockImplementationOnce(cb => {
                cb();
                return "id-1";
            })
            .mockReturnValue("id-2");
        const component = render({}, window);

        component.unmount();

        expect(window.clearTimeout.mock.calls.length).toEqual(2);
        expect(window.clearTimeout.mock.calls[0][0]).toEqual("id-1");
        expect(window.clearTimeout.mock.calls[1][0]).toEqual("id-2");
    });
});
