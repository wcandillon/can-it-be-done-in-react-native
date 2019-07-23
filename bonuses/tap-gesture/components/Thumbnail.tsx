import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";

import { bInterpolate } from "react-native-redash";
import TapHandler from "./TapHandler";

const { Value } = Animated;
const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 8,
    flex: 1,
    height: 250,
    overflow: "hidden"
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    width: undefined,
    height: undefined,
    transform: [{ scale: 1 }]
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    padding: 8,
    justifyContent: "flex-end"
  }
});

interface ThumbnailProps {
  title: string;
  source: number;
  onPress: () => void;
}

export default ({ title, source, onPress }: ThumbnailProps) => {
  const value = new Value(0);
  const scale = bInterpolate(value, 1, 1.5);
  return (
    <TapHandler {...{ onPress, value }}>
      <View style={styles.container}>
        <Animated.Image
          style={[
            styles.image,
            {
              resizeMode: "cover",
              transform: [{ scale }]
            }
          ]}
          {...{ source }}
        />
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
          locations={[0.8, 1]}
        />
        <View style={styles.content}>
          <Text style={{ color: "white", fontSize: 32 }}>{title}</Text>
        </View>
      </View>
    </TapHandler>
  );
};
