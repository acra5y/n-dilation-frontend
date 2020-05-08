import React from "react";
import { shallow } from "enzyme";

import Matrix from "../Matrix";

const defaultProps = {
    matrixInRowMajorOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
};

const render = overrideProps =>
    shallow(<Matrix {...defaultProps} {...overrideProps} />);

describe("Matrix", () => {
    it("should render a grid", () => {
        const component = render();

        expect(component).toMatchSnapshot();
    });
});
