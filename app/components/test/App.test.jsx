import React from "react";
import { shallow } from "enzyme";

import App from "../App";
import GlobalStyles from "../GlobalStyles";
import WindowContext from "../WindowContext";
import Calculator from "../nDilation/Calculator";
import UnsupportedBrowserWarning from "../UnsupportedBrowserWarning";

describe("App", () => {
    it("should render Calculator", () => {
        const component = shallow(<App />);

        expect(component.find(Calculator).exists()).toBe(true);
    });

    describe("should render UnsupportedBrowserWarning", () => {
        const userAgentsForUnsupportedBrowsers = [
            { userAgent: "...Version/14.0 Safari/605.1.15", desc: "Safari" },
            { userAgent: "some-text...MSIE...some-text", desc: "IE < 10" },
        ];

        userAgentsForUnsupportedBrowsers.forEach(({ userAgent, desc }) => {
            it(`for ${desc}`, () => {
                const originalUserAgent = window.navigator.userAgent;

                Object.defineProperty(window.navigator, "userAgent", {
                    value: userAgent,
                    configurable: true,
                });
                const component = shallow(<App />);

                expect(component.find(UnsupportedBrowserWarning).exists()).toBe(
                    true
                );
                Object.defineProperty(window.navigator, "userAgent", {
                    value: originalUserAgent,
                    configurable: true,
                });
            });

            it("for internet explorer 10 and 11 using documentMode", () => {
                window.document.documentMode = true;

                const component = shallow(<App />);

                expect(component.find(UnsupportedBrowserWarning).exists()).toBe(
                    true
                );
                Reflect.deleteProperty(window.document, "documentMode");
            });
        });
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
