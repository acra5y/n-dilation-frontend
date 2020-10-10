import React from "react";
import { shallow, mount } from "enzyme";

import LoadingIndicator from "../LoadingIndicator";
import * as WindowContext from "../../WindowContext";
import * as AnimatedSymbol from "../AnimatedSymbol";
import { INTERVAL } from "../constants";

const amountOfSymbolsLimit = [3];
const symbolIndexLimit = [27];
const flexDirectionLimit = [2];
const flexBasisLimit = [100 / (amountOfSymbolsLimit[0] + 1)];
const offsetTopLimit = [100];

const getRandomIntCallArgsPerRenderCycle = [
    amountOfSymbolsLimit,
    symbolIndexLimit,
    symbolIndexLimit,
    symbolIndexLimit,
    symbolIndexLimit,
    flexDirectionLimit,
    flexBasisLimit,
    offsetTopLimit,
    flexBasisLimit,
    offsetTopLimit,
    flexBasisLimit,
    offsetTopLimit,
    flexBasisLimit,
    offsetTopLimit,
];

const createWindow = (
    setInterval = jest.fn((cb) => {
        cb();
        return "interval-id";
    }),
    clearInterval = jest.fn()
) => ({
    setInterval,
    clearInterval,
});

const createDefaultProps = () => ({
    getRandomInt: jest.fn().mockImplementation((arg) => arg),
});

const render = (
    props = createDefaultProps(),
    window,
    renderMethod = shallow
) => {
    jest.spyOn(WindowContext, "useWindowContext").mockImplementation(
        () => window
    );
    return renderMethod(<LoadingIndicator {...props} />);
};

describe("LoadingIndicator", () => {
    it("should render initially with a set of symbols", () => {
        const component = render();

        expect(component).toMatchSnapshot();
    });

    it("should use getRandomInt from props for randomization of symbols and their styles", () => {
        const props = createDefaultProps();
        render(props);

        expect(props.getRandomInt.mock.calls).toEqual(
            getRandomIntCallArgsPerRenderCycle
        );
    });

    it("should use getRandomInt from props for randomization of symbols and their styles 2s", () => {
        jest.spyOn(AnimatedSymbol, "default").mockImplementation(() => (
            <>mock-component</>
        ));
        const props = createDefaultProps();
        const window = createWindow();
        render(props, window, mount);

        const extraCallForInitialState = [
            amountOfSymbolsLimit,
            symbolIndexLimit,
            symbolIndexLimit,
            symbolIndexLimit,
            symbolIndexLimit,
        ];

        expect(window.setInterval.mock.calls.length).toEqual(1);
        expect(window.setInterval.mock.calls[0][1]).toEqual(INTERVAL);
        expect(props.getRandomInt.mock.calls).toEqual([
            ...getRandomIntCallArgsPerRenderCycle,
            ...extraCallForInitialState,
            ...getRandomIntCallArgsPerRenderCycle,
        ]);
    });
});
