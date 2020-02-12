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
    borderRadius: STROKE_WIDTH / 2
  }
});

interface RingProps {
  ring: Ring;
}

export default ({ ring }: RingProps) => {
  const theta = TAU;
  const radius = ring.size / 2;
  const fg = (
    <AngularGradient colors={[ring.start, ring.end]} size={ring.size} />
  );
  const bg = <View style={{ backgroundColor: ring.bg, flex: 1 }} />;
  return (
    <Animated.View>
      <CircularProgress theta={min(theta, TAU)} {...{ fg, bg, radius }} />
    </Animated.View>
  );
};
