import * as React from "react";
import { Dimensions } from "react-native";
import { DangerZone, Svg } from "expo";

import { runTiming } from "./AnimationHelpers";

const { Animated, Easing } = DangerZone;
const {
  Value,
  Clock,
  diffClamp,
  add,
  abs,
  cond,
  eq,
  block,
  and,
  greaterOrEq,
  set,
  lessOrEq,
  diff,
  interpolate,
  clockRunning,
  sub,
  debug,
  lessThan,
  greaterThan,
  neq,
  multiply,
  Extrapolate,
  call,
  acc,
} = Animated;
const { Ellipse } = Svg;
const { width } = Dimensions.get("window");
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

interface CursorProps {
  size: number;
  segment: number;
  x: Value;
  index: Value;
}

export default class Cursor extends React.PureComponent<CursorProps> {
  render() {
    const {
      size, x: rawX, index, segment,
    } = this.props;
    const clock1 = new Clock();
    const clock2 = new Clock();
    const isTransitioningLeft = new Value(0);
    const isTransitioningRight = new Value(0);
    const center = new Value(0);
    const middle = width / 2;
    const delta = segment + size;
    const x = diffClamp(rawX, -segment, segment);
    const origin = interpolate(index, {
      inputRange: [0, 1, 2],
      outputRange: [middle - delta, middle, middle + delta],
    });
    const offset = sub(x, center);
    const cx = add(origin, offset);
    const rx = add(size, abs(offset));
    const canGoLeft = greaterThan(index, 0);
    const canGoRight = lessThan(index, 2);
    const thresholdRight = sub(add(center, segment), size);
    const thresholdLeft = add(sub(center, segment), size);
    const clockIsStopped = eq(clockRunning(clock1), 0);
    return (
      <>
        <Animated.Code>
          {
            () => block([
              cond(and(greaterOrEq(x, thresholdRight), canGoRight), set(isTransitioningRight, 1)),
              cond(and(lessOrEq(x, thresholdLeft), canGoLeft), set(isTransitioningLeft, 1)),
              cond(eq(isTransitioningRight, 1), [
                set(index, runTiming(clock1, index, add(index, 1))),
                set(center, runTiming(clock2, center, x)),
                cond(clockIsStopped, set(isTransitioningRight, 0)),
              ]),
              cond(eq(isTransitioningLeft, 1), [
                set(index, runTiming(clock1, index, sub(index, 1))),
                set(center, runTiming(clock2, center, x)),
                cond(clockIsStopped, set(isTransitioningLeft, 0)),
              ]),
            ])
          }
        </Animated.Code>
        <Svg width={width} height={64}>
          <AnimatedEllipse
            cx={cx}
            cy={size}
            rx={rx}
            ry={size}
            fill="#656667"
          />
        </Svg>
      </>
    );
  }
}
