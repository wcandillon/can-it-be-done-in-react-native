import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { sub } from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
  line: {
    width: "100%",
    height: 3,
    backgroundColor: "black",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "yellow",
    borderColor: "black",
    borderWidth: 3,
  },
});

interface LineProps {
  theta: Animated.Node<number>;
  radius: number;
}

const Line = ({ theta, radius }: LineProps) => {
  const { x } = polar2Canvas({ theta, radius }, { x: radius, y: radius });
  return (
    <>
      <View style={styles.overlay}>
        <View style={styles.line} />
      </View>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ translateX: sub(x, 25) }],
            },
          ]}
        />
      </View>
    </>
  );
};

export default Line;
