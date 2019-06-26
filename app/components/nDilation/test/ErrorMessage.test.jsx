import React from "react";
import { shallow } from "enzyme";

import ErrorMessage from "../ErrorMessage";

const render = () => shallow(<ErrorMessage />);

describe("ErrorMessage", () => {
    it("should render", () => {
        const component = render();

        expect(component).toMatchSnapshot();
    });
});
