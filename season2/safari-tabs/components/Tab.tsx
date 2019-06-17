import * as React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { translateZ } from "react-native-redash";

const perspective = 1000;
const { width, height } = Dimensions.get("window");
const { multiply, concat, sin, abs } = Animated;

export interface ITab {
  id: number;
  screen: number;
}

interface TabProps {
  tab: ITab;
}

export default ({ tab }: TabProps) => {
  const H = -height / 2;
  const a = -27;
  const rotateX = concat(a, "deg");
  const z = multiply(H, sin(abs(a)));
  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        transform: [{ perspective }, { rotateX }, translateZ(perspective, z)]
      }}
    >
      <Image source={tab.screen} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined
  }
});
