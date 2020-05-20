import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  add,
  and,
  clockRunning,
  cond,
  divide,
  eq,
  floor,
  multiply,
  neq,
  not,
  onChange,
  set,
  sub,
  useCode,
} from "react-native-reanimated";
import {
  clamp,
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from "react-native-redash";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
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
  const ref = useRef<PanGestureHandler>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const refs = assets.map(() => useRef<PinchGestureHandler>(null));
  const clock = useClock();
  const index = useValue(0);
  const offsetX = useValue(0);
  const translationX = useValue(0);
  const translateX = useValue(0);
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const snapTo = clamp(
    snapPoint(translateX, velocity.x, snapPoints),
    multiply(add(index, 1), -width),
    multiply(sub(index, 1), -width)
  );
  useCode(
    () => [
      onChange(
        translationX,
        cond(eq(state, State.ACTIVE), [
          set(translateX, add(offsetX, translationX)),
        ])
      ),
      cond(and(eq(state, State.END), neq(translationX, 0)), [
        set(translateX, timing({ clock, from: translateX, to: snapTo })),
        set(offsetX, translateX),
        cond(not(clockRunning(clock)), [
          set(index, floor(divide(translateX, -width))),
        ]),
      ]),
    ],
    []
  );
  return (
    <PanGestureHandler
      simultaneousHandlers={refs}
      {...{ ref }}
      {...gestureHandler}
    >
      <Animated.View style={styles.container}>
        <Animated.View
          style={[styles.pictures, { transform: [{ translateX }] }]}
        >
          {assets.map((source, i) => (
            <ImageViewer
              key={source}
              isActive={eq(index, i)}
              panState={state}
              panTranslation={translation}
              panVelocity={velocity}
              swipeX={translationX}
              panRef={ref}
              pinchRef={refs[i]}
              {...{ source }}
            />
          ))}
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default WhatsApp;
