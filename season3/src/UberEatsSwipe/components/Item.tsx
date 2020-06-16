import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { clamp, usePanGestureHandler, withSpring } from "react-native-redash";
import ItemLayout, { ItemModel } from "./ItemLayout";

const { width } = Dimensions.get("window");
const config = {
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};
const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#E1E2E3",
  },
});

interface ItemProps {
  item: ItemModel;
}

const Item = ({ item }: ItemProps) => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const value = clamp(translation.x, -width, 0);
  const translateX = withSpring({
    value,
    velocity: velocity.x,
    snapPoints: [0, -width],
    state,
    config,
    onSnap: () => alert("bruh"),
  });
  return (
    <Animated.View>
      <View style={styles.background}>
        <View />
      </View>
      <PanGestureHandler activeOffsetX={[-10, 10]} {...gestureHandler}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <ItemLayout {...{ item }} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Item;
