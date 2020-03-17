import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { bInterpolate } from "react-native-redash";
import { StyleGuide } from "../components";
import CircularProgress from "../components/CircularProgress";

const SIZE = 100;
const ICON_SIZE = 72;
const PADDING = (SIZE - ICON_SIZE) / 2;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2
  },
  content: {
    marginTop: PADDING,
    marginLeft: PADDING
  },
  background: {
    backgroundColor: "white",
    height: ICON_SIZE,
    width: ICON_SIZE,
    borderRadius: ICON_SIZE / 2
  }
});

interface ButtonProps {
  progress: Animated.Node<number>;
}

//  check-circle
//
export default ({ progress }: ButtonProps) => {
  const height = bInterpolate(progress, 0, SIZE);
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
        <View style={styles.content}>
          <View style={styles.background}>
            <Icon
              name="fingerprint"
              color={StyleGuide.palette.background}
              size={72}
            />
          </View>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              overflow: "hidden",
              height
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
    </View>
  );
};
