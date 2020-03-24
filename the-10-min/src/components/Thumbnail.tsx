import * as React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { bInterpolate } from "react-native-redash";
import StyleGuide from "./StyleGuide";
import Text from "./Text";
import TapHandler from "./TapHandler";

const { Value } = Animated;
const styles = StyleSheet.create({
  container: {
    margin: StyleGuide.spacing * 2,
    marginBottom: 0,
    borderRadius: 8,
    flex: 1,
    height: 150,
    overflow: "hidden",
    backgroundColor: StyleGuide.palette.backgroundPrimary,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    width: undefined,
    height: undefined,
    transform: [{ scale: 1 }],
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    padding: StyleGuide.spacing,
    justifyContent: "flex-end",
  },
});

interface ThumbnailProps {
  title: string;
  source: number;
  onPress: () => void;
  resizeMode?: "cover" | "contain";
  dark?: boolean;
  comingSoon?: boolean;
}

export default ({
  title,
  source,
  onPress,
  dark,
  resizeMode,
  comingSoon,
}: ThumbnailProps) => {
  const value = new Value(0);
  const scale = bInterpolate(value, 1, 1.5);
  return (
    <TapHandler {...{ onPress, value }}>
      <View style={styles.container}>
        <Animated.Image
          style={[
            styles.image,
            {
              resizeMode: resizeMode || "contain",
              transform: [{ scale }],
            },
          ]}
          {...{ source }}
        />
        <View style={styles.content}>
          {comingSoon && (
            <Text type="subhead" style={{ color: "#2F2E41" }}>
              {"Coming soon".toUpperCase()}
            </Text>
          )}
          <Text type="title2" style={{ color: dark ? "white" : "#2F2E41" }}>
            {title}
          </Text>
        </View>
      </View>
    </TapHandler>
  );
};
