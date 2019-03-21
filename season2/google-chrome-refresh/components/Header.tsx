import * as React from "react";
import {
  SafeAreaView, StyleSheet, Dimensions,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { DangerZone } from "expo";

import Cursor from "./Cursor";

const { Animated } = DangerZone;
const {
  Value, Extrapolate, interpolate, divide, greaterOrEq, color, cond, eq, call, set, diff, neq, block, add,
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
    const segment = (width - (size * 3)) / 4;
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
      outputRange: [segment, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const translateXRight = interpolate(y, {
      inputRange: [height, height * 2],
      outputRange: [-segment, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const white = color(255, 255, 255);
    const black = color(0, 0, 0);
    const index = new Value(1);
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
          <Cursor
            {...{
              size, x, index, segment,
            }}
          />
        </Animated.View>
        <Animated.View style={[styles.content, { transform: [{ translateY }] }]}>
          <Animated.View style={{ opacity, transform: [{ translateX: translateXLeft }] }}>
            <Animated.Text style={{ color: cond(eq(index, 0), white, black) }}>
              <Icon name="plus" {...{ size }} />
            </Animated.Text>
          </Animated.View>
          <Animated.View style={{ opacity: opacityCenter }}>
            <Animated.Text style={{ color: cond(eq(index, 1), cond(greaterOrEq(y, height * 2 + 4), white, black), black) }}>
              <Icon name="refresh-ccw" {...{ size }} />
            </Animated.Text>
          </Animated.View>
          <Animated.View style={{ opacity, transform: [{ translateX: translateXRight }] }}>
            <Animated.Text style={{ color: cond(eq(index, 2), white, black) }}>
              <Icon name="x" {...{ size }} />
            </Animated.Text>
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
