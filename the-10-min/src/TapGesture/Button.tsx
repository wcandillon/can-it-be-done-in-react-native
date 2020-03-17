import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { bInterpolate } from "react-native-redash";
import { StyleGuide } from "../components";
import CircularProgress from "../components/CircularProgress";

const SIZE = 150;
const ICON_SIZE = 92;
const PADDING = (SIZE - ICON_SIZE) / 2;
const STROKE_WIDTH = 10;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    top: PADDING - STROKE_WIDTH,
    left: PADDING - STROKE_WIDTH
  },
  background: {
    backgroundColor: "white",
    height: SIZE - STROKE_WIDTH * 2,
    width: SIZE - STROKE_WIDTH * 2,
    borderRadius: (SIZE - STROKE_WIDTH * 2) / 2
  }
});

interface ButtonProps {
  progress: Animated.Node<number>;
}

//  check-circle
//
export default ({ progress }: ButtonProps) => {
  const height = bInterpolate(progress, 0, ICON_SIZE);
  return (
    <View>
      <View style={StyleSheet.absoluteFill}>
        <CircularProgress
          {...{ progress }}
          radius={SIZE / 2}
          fg={StyleGuide.palette.primary}
          bg="white"
        />
      </View>
      <View style={styles.container}>
        <View style={styles.background}>
          <Icon
            name="fingerprint"
            color={StyleGuide.palette.background}
            size={ICON_SIZE}
            style={styles.icon}
          />
        </View>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            overflow: "hidden",
            height,
            left: PADDING,
            top: PADDING
          }}
        >
          <Icon
            name="fingerprint"
            color={StyleGuide.palette.primary}
            size={ICON_SIZE}
          />
        </Animated.View>
      </View>
    </View>
  );
};
