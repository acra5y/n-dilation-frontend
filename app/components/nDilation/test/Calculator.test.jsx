import React from "react";
import { shallow } from "enzyme";

import Calculator from "../Calculator";

describe("Calculator", () => {
    it("should render", () => {
        const component = shallow(<Calculator />);

        expect(component).toMatchSnapshot();
    });
});
