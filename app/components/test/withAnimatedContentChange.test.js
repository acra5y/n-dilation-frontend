import React from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";

import withAnimatedContentChange from "../withAnimatedContentChange";

const TestComponent = () => "TestComponent";
const WrappedComponent = withAnimatedContentChange(TestComponent);
const defaultProps = { foo: "bar" };

const render = () => shallow(<WrappedComponent {...defaultProps} />);

describe("withAnimatedContentChange", () => {
    it("should render a component with readable displayName", () => {
        expect(WrappedComponent.displayName).toEqual(
            "withAnimatedContentChange(TestComponent)"
        );
    });

    it("should render a component with readable displayName if the wrapped component has a disaplayName", () => {
        const OtherTestComponent = () => "TestComponent";
        OtherTestComponent.displayName = "SomeDisplayName";
        expect(
            withAnimatedContentChange(OtherTestComponent).displayName
        ).toEqual("withAnimatedContentChange(SomeDisplayName)");
    });

    it("should pass animationTimeInSecond props to the wrapped component for it to be used in an animation", () => {
        expect(render().prop("animationTimeInSeconds")).toEqual(0.1);
    });

    it("should pass original props to the wrapped component", () => {
        expect(render().prop("foo")).toEqual("bar");
    });

    it("should set opacity twice with a pause of 0.1 seconds when the component renders the first time and when props change", () => {
        const letUseEffectFinish = () => {
            act(() => {
                jest.runAllTimers();
            });
            component.update();
        };

        const assertOpacityChangesFromUseEffect = (expectedCustomProps) => {
            expect(component.find(TestComponent).prop("opacity")).toEqual(0);
            letUseEffectFinish();
            expect(component.find(TestComponent).props()).toEqual({
                ...expectedCustomProps,
                animationTimeInSeconds: 0.1,
                opacity: 1,
            });
        };

        jest.useFakeTimers();

        const component = mount(<WrappedComponent {...defaultProps} />);

        assertOpacityChangesFromUseEffect({ foo: "bar" });

        component.setProps({ bat: "baz" });
        component.update();

        assertOpacityChangesFromUseEffect({ foo: "bar", bat: "baz" });
    });
});
