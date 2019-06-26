import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { onGestureEvent, decay, transformOrigin } from "react-native-redash";

import { Channel } from "./Model";
import ChannelIcon from "./ChannelIcon";

const { Value, interpolate, set, divide, modulo, sub, useCode } = Animated;
const { width } = Dimensions.get("window");
const height = width / 1.4;
const D = width * 1.2;
const R = D / 2;
const styles = StyleSheet.create({
  container: {
    width,
    height
  }
});

interface CircularSelectionProps {
  channels: Channel[];
  index: Animated.Value<number>;
}

export default ({ channels, index }: CircularSelectionProps) => {
  const l = Math.sin(Math.PI / channels.length);
  const r = (R * l) / (1 - l);
  const outerR = R + 2 * r;
  const cx = width / 2 - r;
  const cy = outerR - r;
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureEvent = onGestureEvent({
    translationX,
    velocityX,
    state
  });
  const segment = (2 * Math.PI) / channels.length;
  const translateX = decay(translationX, state, velocityX);
  const rotateZ = interpolate(translateX, {
    inputRange: [0, outerR],
    outputRange: [0, Math.PI / 2]
  });
  useCode(
    set(
      index,
      sub(channels.length, modulo(divide(rotateZ, segment), channels.length))
    ),
    []
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          borderRadius: outerR,
          width: outerR * 2,
          height: outerR * 2,
          backgroundColor: "#3498db",
          left: -(outerR - width / 2)
        }}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: transformOrigin(0, outerR - height / 2, { rotateZ })
        }}
      >
        {channels.map((channel, key) => {
          return (
            <View
              {...{ key }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: [
                  { translateX: cx },
                  { translateY: cy },
                  { rotateZ: `${key * segment}rad` },
                  { translateY: -cy }
                ]
              }}
            >
              <ChannelIcon name={`${key + 1}`} radius={r} />
            </View>
          );
        })}
      </Animated.View>
      <PanGestureHandler {...gestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill} />
      </PanGestureHandler>
    </View>
  );
};
