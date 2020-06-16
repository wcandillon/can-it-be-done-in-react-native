import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  abs,
  add,
  call,
  clockRunning,
  cond,
  eq,
  not,
  set,
  useCode,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import {
  clamp,
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from "react-native-redash";
import ItemLayout, { ItemModel, HEIGHT } from "./ItemLayout";
import Action from "./Action";

const { width } = Dimensions.get("window");
const snapPoints = [-width, -100, 0];
const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#E1E2E3",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
});

interface ItemProps {
  item: ItemModel;
  onSwipe: () => void;
}

const Item = ({ item, onSwipe }: ItemProps) => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const clock = useClock();
  const height = useValue(HEIGHT);
  const offsetX = useValue(0);
  const translateX = useValue(0);
  const opacity = useValue(1);
  const shouldDelete = useValue(0);
  const to = snapPoint(translateX, velocity.x, snapPoints);
  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(translateX, clamp(add(offsetX, translation.x), -width, 0)),
      ]),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        cond(eq(to, -width), [set(shouldDelete, 1)]),
        set(offsetX, translateX),
      ]),
      cond(shouldDelete, [
        set(height, timing({ from: HEIGHT, to: 0 })),
        set(opacity, 0),
        cond(not(clockRunning(clock)), [
          call([], onSwipe),
          set(shouldDelete, 0),
        ]),
      ]),
    ],
    [onSwipe]
  );
  return (
    <Animated.View>
      <View style={styles.background}>
        <TouchableWithoutFeedback onPress={() => shouldDelete.setValue(1)}>
          <Action x={abs(translateX)} {...{ opacity }} />
        </TouchableWithoutFeedback>
      </View>
      <PanGestureHandler activeOffsetX={[-10, 10]} {...gestureHandler}>
        <Animated.View
          style={{
            height,
            transform: [{ translateX }],
            justifyContent: "center",
          }}
        >
          <ItemLayout {...{ item }} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Item;
