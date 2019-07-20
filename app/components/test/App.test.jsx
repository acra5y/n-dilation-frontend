import React from "react";
import { shallow } from "enzyme";

import App from "../App";
import GlobalStyles from "../GlobalStyles";
import Calculator from "../nDilation/Calculator";

describe("App", () => {
    it("should render Calculator", () => {
        const component = shallow(<App />);

        expect(component.find(Calculator).exists()).toBe(true);
    });

    it("should insert global styles", () => {
        const component = shallow(<App />);

        expect(component.find(GlobalStyles).exists()).toBe(true);
    });
});
