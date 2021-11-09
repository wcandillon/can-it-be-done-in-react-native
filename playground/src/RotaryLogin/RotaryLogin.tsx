import { StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, G, Mask } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";
import { transformOrigin } from "react-native-redash";

import {
  Quadrant,
  STROKE_WIDTH,
  RADIUS,
  center,
  DIGITS,
  PADDING,
} from "./Quadrant";
import { Gesture } from "./Gesture";
import { Title } from "./Title";
import { Status } from "./Status";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
  },
});

interface DigitProps {
  theta: Animated.SharedValue<number>;
  cx: number;
  cy: number;
  i: number;
}

const Digit = ({ cx, cy, i, theta }: DigitProps) => {
  const props = useAnimatedProps(() => {
    return {
      transform: transformOrigin(center, [{ rotate: `${-theta.value}rad` }]),
    };
  });
  return (
    <AnimatedCircle
      key={i}
      cx={cx}
      cy={cy}
      r={STROKE_WIDTH / 2 - PADDING}
      fill="white"
      animatedProps={props}
    />
  );
};

export const RotaryLogin = () => {
  const passcode = useSharedValue("");
  const theta = useSharedValue(0);
  const r = RADIUS - STROKE_WIDTH / 2;
  const circumference = 2 * Math.PI * r;
  const animatedProps = useAnimatedProps(() => {
    return {
      transform: transformOrigin(center, [{ rotate: `${-theta.value}rad` }]),
    };
  });
  return (
    <View style={{ flex: 1 }}>
      <Svg style={styles.container}>
        <Defs>
          <Mask id="mask">
            {DIGITS.slice(0, 10).map(({ x, y }, i) => (
              <Digit key={i} i={i} cx={x} cy={y} theta={theta} />
            ))}
          </Mask>
        </Defs>
        <Quadrant />
        <Circle
          fill="white"
          cx={center.x}
          cy={center.y}
          r={RADIUS - STROKE_WIDTH}
        />
        <AnimatedCircle
          cx={center.x}
          cy={center.y}
          r={r}
          strokeWidth={STROKE_WIDTH - PADDING}
          stroke="white"
          strokeDasharray={[circumference, circumference]}
          strokeDashoffset={-0.305 * circumference}
          strokeLinecap="round"
          animatedProps={animatedProps}
        />
        <G mask="url(#mask)">
          <Quadrant />
        </G>
        <Title />
        <Status passcode={passcode} />
      </Svg>
      <Gesture theta={theta} passcode={passcode} />
    </View>
  );
};
