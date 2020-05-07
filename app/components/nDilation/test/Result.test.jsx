import React from "react";
import { shallow } from "enzyme";

import { Result } from "../Result";

describe("Result component", () => {
    const testCases = [
        {
            props: {},
            description:
                "should render correct markup when error and dilation are undefined",
        },
        {
            props: { isLoading: true },
            description: "should render correct markup when isLoading is true",
        },
        {
            props: { dilation: [1, 2, 3, 4] },
            description:
                "should render correct markup dilation prop is defined",
        },
        {
            props: {
                dilation: [1, 2, 3, 4],
                runtimeError: true,
            },
            description:
                "should render correct markup dilation and runtimeError is true",
        },
        {
            props: { validationError: true },
            description: "should render correct markup validationError is true",
        },
    ];
    testCases.forEach(({ props, description }) => {
        it(description, () => {
            expect(shallow(<Result {...props} />)).toMatchSnapshot();
        });
    });
});
