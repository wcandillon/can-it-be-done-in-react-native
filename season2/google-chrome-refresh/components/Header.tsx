import * as React from "react";
import {
  SafeAreaView, StyleSheet, Dimensions,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { DangerZone } from "expo";

import Circle from "./Circle";

const { Animated } = DangerZone;
const {
  Value, Extrapolate, interpolate, divide,
} = Animated;
const height = 64;
const size = 32;
const { width } = Dimensions.get("window");

interface HeaderProps {
  x: Value,
  y: Value
}

export default class Header extends React.PureComponent<HeaderProps> {
  render() {
    const { x, y } = this.props;
    const translateY = divide(y, -2);
    const translation = (width - (size * 3)) / 4;
    const cursor = interpolate(y, {
      inputRange: [height * 2, height * 2 + 4],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    });
    const opacity = interpolate(y, {
      inputRange: [height, height * 2],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    });
    const opacityCenter = interpolate(y, {
      inputRange: [0, height],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    });
    const translateXLeft = interpolate(y, {
      inputRange: [height, height * 2],
      outputRange: [translation, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const translateXRight = interpolate(y, {
      inputRange: [height, height * 2],
      outputRange: [-translation, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ translateY }, { scale: cursor }],
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          opacity: cursor,
        }}
        >
          <Circle
            inputRange={[-width / 8, width / 8]}
            outputRange={[-translation - size, translation + size]}
            {...{ size, x }}
          />
        </Animated.View>
        <Animated.View style={[styles.content, { transform: [{ translateY }] }]}>
          <Animated.View style={{ opacity, transform: [{ translateX: translateXLeft }] }}>
            <Icon name="plus" {...{ size }} />
          </Animated.View>
          <Animated.View style={{ opacity: opacityCenter }}>
            <Icon name="refresh-ccw" {...{ size }} />
          </Animated.View>
          <Animated.View style={{ opacity, transform: [{ translateX: translateXRight }] }}>
            <Icon name="x" {...{ size }} />
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f1f2",
  },
  content: {
    height,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
