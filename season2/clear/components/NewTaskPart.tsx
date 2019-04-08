import * as React from "react";
import { StyleSheet } from "react-native";
import { DangerZone } from "expo";

import Task, { TASK_HEIGHT } from "./Task";

export { TASK_HEIGHT } from "./Task";

const { Animated } = DangerZone;
const {
  Value, interpolate, Extrapolate, concat, multiply, divide, sub, abs, sin,
} = Animated;
type Val = typeof Value | number;
const toRad = (deg: Val): Val => multiply(deg, Math.PI / 180);

interface NewTaskPartProps {
  scale: typeof Value;
  backgroundColor: typeof Value;
  task: string;
  isOnTop?: boolean;
}

export default class NewTaskPart extends React.PureComponent<NewTaskPartProps> {
  static defaultProps = {
    isOnTop: false,
  };

  render() {
    const {
      scale, backgroundColor, task, isOnTop,
    } = this.props;
    const inputRange = [0, 2];
    const perspective = 1000;// isOnTop ? 128 : -128;
    const opacity = interpolate(scale, {
      inputRange,
      outputRange: [isOnTop ? 0.5 : 0.6, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const rotateX = interpolate(scale, {
      inputRange,
      outputRange: [isOnTop ? -90 : 90, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const translateZ = multiply(-TASK_HEIGHT / 2, sin(toRad(abs(rotateX))));
    return (
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            { perspective },
            { rotateX: concat(rotateX, "deg") },
            { scale: divide(perspective, sub(perspective, translateZ)) },
          ],
        }}
      >
        <Task {...{ task, backgroundColor }} />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity,
            backgroundColor: "black",
          }}
        />
      </Animated.View>

    );
  }
}
