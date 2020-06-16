import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { clamp, snapPoint, usePanGestureHandler } from "react-native-redash";
import { withTiming } from "./AnimatedHelpers";
import ItemLayout, { ItemModel } from "./ItemLayout";

const { width } = Dimensions.get("window");
const snapPoints = [-width, 0];
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
  const from = clamp(translation.x, -width, 0);
  const to = snapPoint(from, velocity.x, snapPoints);
  const translateX = withTiming({
    from,
    to,
    state,
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
