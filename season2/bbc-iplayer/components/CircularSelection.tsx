import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { transformOrigin } from "react-native-redash";

import { Channel } from "./Model";
import ChannelIcon from "./ChannelIcon";
import PanGesture from "./PanGesture";

const {
  Value,
  interpolate,
  set,
  divide,
  modulo,
  sub,
  onChange,
  useCode
} = Animated;
const { width } = Dimensions.get("window");
const height = width / 1.4;
const D = width * 1.2;
const innerR = D / 2;
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
  const r = (innerR * l) / (1 - l);
  const R = innerR + 2 * r;
  const cx = width / 2 - r;
  const cy = R - r;
  const segment = (2 * Math.PI) / channels.length;
  const rotateZ = interpolate(index, {
    inputRange: [0, channels.length],
    outputRange: [0, -2 * Math.PI]
  });
  const translateX = new Value(0);
  useCode(
    onChange(
      translateX,
      set(
        index,
        sub(
          channels.length,
          modulo(divide(translateX, channels.length), channels.length)
        )
      )
    ),
    []
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          borderRadius: R,
          width: R * 2,
          height: R * 2,
          backgroundColor: "#3498db",
          left: -(R - width / 2)
        }}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: transformOrigin(0, R - height / 2, { rotateZ })
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
      <PanGesture {...{ translateX }} />
    </View>
  );
};
