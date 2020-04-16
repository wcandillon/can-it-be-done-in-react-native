import React from "react";
import Animated, { lessThan, max, min, sub } from "react-native-reanimated";
import { PixelRatio, StyleSheet, View } from "react-native";
import { interpolateColor } from "react-native-redash";

import { Ring, STROKE_WIDTH, TAU } from "./Constants";
import CircularProgress from "./CircularProgress";
import AngularGradient from "./AngularGradient";
import Shadow from "./Shadow";

const styles = StyleSheet.create({
  knob: {
    ...StyleSheet.absoluteFillObject,
    width: STROKE_WIDTH,
    height: STROKE_WIDTH,
    borderRadius: STROKE_WIDTH / 2,
  },
});

interface RingProps {
  ring: Ring;
  theta: Animated.Node<number>;
}

export default ({ ring, theta }: RingProps) => {
  const radius = PixelRatio.roundToNearestPixel(ring.size / 2);
  const fg = (
    <AngularGradient colors={[ring.start, ring.end]} size={ring.size} />
  );
  const bg = <View style={{ backgroundColor: ring.bg, flex: 1 }} />;
  const rotate = max(0, sub(theta, TAU));
  const opacity = lessThan(theta, TAU);
  const backgroundColor = interpolateColor(theta, {
    inputRange: [0, TAU],
    outputRange: [ring.start, ring.end],
  });
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
            top: radius - STROKE_WIDTH / 2,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.knob,
          {
            top: radius - STROKE_WIDTH / 2,
            transform: [
              { translateX: radius - STROKE_WIDTH / 2 },
              { rotate: theta },
              { translateX: -(radius - STROKE_WIDTH / 2) },
              { translateY: -4 },
            ],
          },
        ]}
      >
        <Shadow />
      </Animated.View>
      <Animated.View
        style={[
          styles.knob,
          {
            backgroundColor,
            top: radius - STROKE_WIDTH / 2,
            transform: [
              { translateX: radius - STROKE_WIDTH / 2 },
              { rotate: theta },
              { translateX: -(radius - STROKE_WIDTH / 2) },
            ],
          },
        ]}
      />
    </View>
  );
};
