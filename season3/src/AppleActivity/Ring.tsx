import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  lessThan,
  max,
  min,
  sub
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { Ring, STROKE_WIDTH, TAU } from "./Constants";
import CircularProgress from "./CircularProgress";
import AngularGradient from "./AngularGradient";

const styles = StyleSheet.create({
  knob: {
    ...StyleSheet.absoluteFillObject,
    width: STROKE_WIDTH,
    height: STROKE_WIDTH,
    borderRadius: STROKE_WIDTH / 2
  }
});

interface RingProps {
  ring: Ring;
  theta: Animated.Node<number>;
}

export default ({ ring, theta }: RingProps) => {
  const radius = ring.size / 2;
  const fg = (
    <AngularGradient size={ring.size} colors={[ring.end, ring.start]} />
  );
  const bg = <View style={{ backgroundColor: ring.bg, flex: 1 }} />;
  const rotate = max(0, sub(theta, TAU));
  const opacity = lessThan(theta, TAU);
  return (
    <View>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <CircularProgress theta={min(theta, TAU)} {...{ fg, bg, radius }} />
      </Animated.View>
      <Animated.View
        style={[
          styles.knob,
          {
            opacity,
            backgroundColor: ring.start,
            top: radius - STROKE_WIDTH / 2
          }
        ]}
      />
    </View>
  );
};
