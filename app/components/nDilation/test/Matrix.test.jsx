import React from "react";
import { shallow } from "enzyme";

import Matrix from "../Matrix";

const defaultProps = {
    matrixInRowMajorOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
};

const render = overrideProps =>
    shallow(<Matrix {...defaultProps} {...overrideProps} />);

describe("Matrix", () => {
    it("should render the right amount of rows and columns", () => {
        const component = render();

        const rows = component.children();
        expect(rows.length).toEqual(3);

        expect(rows.at(0).text()).toEqual("012");
        expect(rows.at(1).text()).toEqual("345");
        expect(rows.at(2).text()).toEqual("678");
    });
});
