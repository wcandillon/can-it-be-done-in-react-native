import * as React from "react";
import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { DangerZone } from "expo";

const { Animated } = DangerZone;
const {
  Value, Extrapolate, interpolate, divide,
} = Animated;
const height = 64;
const iconSize = 32;
const { width } = Dimensions.get("window");

interface HeaderProps {
  x: Value,
  y: Value
}

export default class Header extends React.PureComponent<HeaderProps> {
  render() {
    const { x, y } = this.props;
    const translateY = divide(y, -2);
    const translation = (width - (iconSize * 3)) / 4;
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
        <Animated.View style={[styles.content, { transform: [{ translateY }] }]}>
          <Animated.View style={{ opacity, transform: [{ translateX: translateXLeft }] }}>
            <Icon name="plus" size={iconSize} />
          </Animated.View>
          <Animated.View style={{ opacity: opacityCenter }}>
            <Icon name="refresh-ccw" size={iconSize} />
          </Animated.View>
          <Animated.View style={{ opacity, transform: [{ translateX: translateXRight }] }}>
            <Icon name="x" size={iconSize} />
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
