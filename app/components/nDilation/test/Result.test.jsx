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
            props: { dilation: [1, 2, 3, 4] },
            description:
                "should render correct markup dilation prop is defined",
        },
        {
            props: {
                dilation: [1, 2, 3, 4],
                errorDetails: new Error("Test-Error"),
            },
            description:
                "should render correct markup dilation and errorDetail props are defined",
        },
        {
            props: { errorDetails: new Error("Test-Error") },
            description:
                "should render correct markup errorDetail props is defined",
        },
    ];
    testCases.forEach(({ props, description }) => {
        it(description, () => {
            expect(shallow(<Result {...props} />)).toMatchSnapshot();
        });
    });
});
