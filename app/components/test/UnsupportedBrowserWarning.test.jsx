import React from "react";
import { shallow } from "enzyme";

import UnsupportedBrowserWarning from "../UnsupportedBrowserWarning";

describe("UnsupportedBrowserWarning", () => {
    it("should render", () => {
        const component = shallow(<UnsupportedBrowserWarning />);

        expect(component.find("div").exists()).toBe(true);
    });
});
