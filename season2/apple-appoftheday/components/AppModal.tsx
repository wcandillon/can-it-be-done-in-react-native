import * as React from "react";
import { Dimensions } from "react-native";
import { DangerZone } from "expo";
import { binaryInterpolation, runTiming, clockRunning } from "react-native-redash";

import AppThumbnail from "./AppThumbnail";
import { App, Position } from "./Model";
import Content from "./Content";
import SwipeToClose from "./SwipeToClose";

const { width: wWidth } = Dimensions.get("window");
const { Animated, Easing } = DangerZone;
const {
  Value, Clock, block, set, cond, greaterThan, eq, round, greaterOrEq, neq, and, call,
} = Animated;
const timingConfig = {
  toValue: 1,
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};
export interface AppModalProps {
  app: App;
  position: Position;
  closeTransition: () => void;
}

export default ({ app, position, closeTransition } : AppModalProps) => {
  const clock = new Clock();
  const opened = new Value(0);
  const driver = new Value(0);
  const translationY = new Value(0);
  const x = new Value(position.x);
  const y = new Value(position.y);
  const width = new Value(position.width);
  const height = new Value(position.height);
  const contentX = new Value(position.x);
  const contentY = new Value(position.y);
  const borderRadius = cond(eq(driver, 0), 8, cond(greaterThan(round(translationY), 0), 8));
  return (
    <SwipeToClose {...{ driver, translationY }}>
      <Animated.Code>
        {
          () => block([
            cond(eq(opened, 0), [
              set(driver, runTiming(clock, 0, timingConfig)),
              cond(eq(clockRunning(clock), 0), set(opened, 1)),
            ]),
            set(x, binaryInterpolation(driver, position.x, 0)),
            set(y, binaryInterpolation(driver, position.y, 0)),
            set(width, binaryInterpolation(driver, position.width, wWidth)),
            set(contentX, binaryInterpolation(driver, position.x, 0)),
            set(contentY, binaryInterpolation(driver, position.y, position.height)),
            cond(and(greaterOrEq(round(translationY), 100), neq(driver, 0)), [
              set(driver, runTiming(clock, 1, {
                toValue: 0,
                duration: 300,
                easing: Easing.inOut(Easing.ease),
              })),
              cond(eq(clockRunning(clock), 0), call([], closeTransition)),
            ]),
          ])
        }
      </Animated.Code>
      <Animated.View
        style={{
          position: "absolute",
          borderRadius,
          width,
          height,
          top: contentY,
          left: contentX,
          backgroundColor: "white",
        }}
      >
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          borderRadius,
          width,
          height,
          top: contentY,
          left: contentX,
          opacity: cond(greaterThan(driver, 0.5), 1, 0),
        }}
      >
        <Content />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          width,
          height,
          top: y,
          left: x,
        }}
      >
        <AppThumbnail {...{ app, borderRadius }} />
      </Animated.View>
    </SwipeToClose>
  );
};
