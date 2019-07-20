import React from "react";
import { shallow } from "enzyme";

import App from "../App";
import GlobalStyles from "../GlobalStyles";
import WindowContext from "../WindowContext";
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

    describe("should render WindowContext Provider", () => {
        it("on server with null as window (when window is not defined)", () => {
            const globalWindow = global.window;
            Reflect.deleteProperty(global, "window");
            const component = shallow(<App />);

            expect(component.find(WindowContext.Provider).prop("value")).toBe(
                null
            );
            global.window = globalWindow; // restore global config to not mess with other tests
        });

        it("with global window as value", () => {
            const component = shallow(<App />);

            expect(component.find(WindowContext.Provider).prop("value")).toBe(
                window
            );
        });
    });
});
