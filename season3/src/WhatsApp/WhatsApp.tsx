import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  add,
  block,
  cond,
  eq,
  set,
  useCode,
} from "react-native-reanimated";
import {
  snapPoint,
  timing,
  usePanGestureHandler,
  useValue,
} from "react-native-redash";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import ImageViewer, { CANVAS } from "./ImageViewer";

export const assets = [
  require("./assets/3.jpg"),
  require("./assets/2.jpg"),
  require("./assets/4.jpg"),
  require("./assets/5.jpg"),
  require("./assets/1.jpg"),
];

const { x: width, y: height } = CANVAS;
const snapPoints = assets.map((_, i) => -width * i);
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  pictures: {
    flexDirection: "row",
    height,
    width: width * assets.length,
  },
});

const WhatsApp = () => {
  const offsetX = useValue(0);
  const translateX = useValue(0);
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const snapTo = snapPoint(translateX, velocity.x, snapPoints);
  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(translateX, add(offsetX, translation.x)),
      ]),
      cond(eq(state, State.END), [
        set(translateX, timing({ from: translateX, to: snapTo })),
        set(offsetX, translateX),
      ]),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={styles.container}>
        <Animated.View
          style={[styles.pictures, { transform: [{ translateX }] }]}
        >
          {assets.map((source) => (
            <ImageViewer key={source} {...{ source }} />
          ))}
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default WhatsApp;
