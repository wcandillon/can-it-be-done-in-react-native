import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { Svg, DangerZone, Contacts } from "expo";

import Cursor from "./Cursor";
import { toDeg } from "./Math";

const { Animated } = DangerZone;
const {
  Value, debug, block, multiply, sub, concat, round, cond, greaterThan,
} = Animated;

const { width } = Dimensions.get("window");
const size = width - 32;
const padding = 25;
const radius = size / 2 - padding;
const {
  Defs, LinearGradient, Stop, Circle,
} = Svg;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default () => {
  const start = new Value(0);
  const end = new Value(0);
  const circumference = radius * 2 * Math.PI;
  const delta = cond(greaterThan(end, start), sub(end, start), sub(start, end));
  const strokeDashoffset = multiply(delta, radius);
  return (
    <View style={styles.container}>
      <Animated.View style={{
        ...StyleSheet.absoluteFillObject,
        transform: [
          { rotateZ: concat(sub(Math.PI * 2, cond(greaterThan(end, start), start, end)), "rad") },
        ],
      }}
      >
        <Svg style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
              <Stop offset="0" stopColor="#f7cd46" />
              <Stop offset="1" stopColor="#ef9837" />
            </LinearGradient>
          </Defs>
          <AnimatedCircle
            strokeWidth={padding * 2}
            stroke="url(#grad)"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={`${circumference}, ${circumference}`}
            {...{ strokeDashoffset }}
          />
        </Svg>
      </Animated.View>
      <Cursor α={start} {...{ radius }} />
      <Cursor α={end} {...{ radius }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
  },
});
