import * as React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { DangerZone } from "expo";

const { Animated } = DangerZone;
const {
  Value, interpolate, add, multiply, divide,
} = Animated;

interface HeaderProps {
  x: Value,
  y: Value
}

export default class Header extends React.PureComponent<HeaderProps> {
  render() {
    const { x, y } = this.props;
    const translateY = divide(y, -2);
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.content, { transform: [{ translateY }] }]}>
          <Icon name="plus" size={32} />
          <Icon name="refresh-ccw" size={32} />
          <Icon name="x" size={32} />
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
    height: 64,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
