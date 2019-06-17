import React from "react";
import { shallow } from "enzyme";

import App from "../App";
import Calculator from "../nDilation/Calculator";

describe("App", () => {
    it("should render Calculator", () => {
        const component = shallow(<App />);

        expect(component.find(Calculator).exists()).toBe(true);
    });
});
