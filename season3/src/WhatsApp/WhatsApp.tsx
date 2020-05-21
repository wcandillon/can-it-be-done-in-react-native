import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Value,
  add,
  and,
  call,
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
  translate as translateVector,
  useClock,
  usePanGestureHandler,
  usePinchGestureHandler,
  useValue,
  vec,
} from "react-native-redash";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import { CANVAS, usePinch } from "./AnimationUtil";

const { width, height } = Dimensions.get("window");
export const assets = [
  require("./assets/3.jpg"),
  require("./assets/2.jpg"),
  require("./assets/4.jpg"),
  require("./assets/5.jpg"),
  require("./assets/1.jpg"),
];

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
  picture: {
    width,
    height,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
});

const WhatsApp = () => {
  const index = useValue(0);

  const pinchRef = useRef<PinchGestureHandler>(null);
  const panRef = useRef<PanGestureHandler>(null);

  const pan = usePanGestureHandler();
  const pinch = usePinchGestureHandler();

  const scale = useValue(1);
  const translate = vec.createValue(0, 0);

  const clock = useClock();
  const offsetX = useValue(0);
  const translationX = useValue(0);
  const translateX = useValue(0);

  const minVec = vec.min(vec.multiply(-0.5, CANVAS, sub(scale, 1)), 0);
  const maxVec = vec.max(vec.minus(minVec), 0);
  usePinch({ pan, pinch, translate, scale, minVec, maxVec, translationX });
  const snapTo = clamp(
    snapPoint(translateX, pan.velocity.x, snapPoints),
    multiply(add(index, 1), -width),
    multiply(sub(index, 1), -width)
  );
  useCode(
    () => [
      onChange(
        translationX,
        cond(eq(pan.state, State.ACTIVE), [
          set(translateX, add(offsetX, translationX)),
        ])
      ),
      cond(and(eq(pan.state, State.END), neq(translationX, 0)), [
        set(translateX, timing({ clock, from: translateX, to: snapTo })),
        set(offsetX, translateX),
        cond(not(clockRunning(clock)), [
          vec.set(translate, 0),
          set(scale, 1),
          set(index, floor(divide(translateX, -width))),
        ]),
      ]),
    ],
    [index]
  );
  return (
    <PinchGestureHandler
      ref={pinchRef}
      simultaneousHandlers={panRef}
      {...pinch.gestureHandler}
    >
      <Animated.View style={StyleSheet.absoluteFill}>
        <PanGestureHandler
          ref={panRef}
          minDist={10}
          avgTouches
          simultaneousHandlers={pinchRef}
          {...pan.gestureHandler}
        >
          <Animated.View style={styles.container}>
            <Animated.View
              style={[styles.pictures, { transform: [{ translateX }] }]}
            >
              {assets.map((source, i) => {
                const isActive = eq(index, i);
                return (
                  <View key={i} style={styles.picture}>
                    <Animated.Image
                      style={[
                        styles.image,
                        {
                          transform: [
                            { translateX: cond(isActive, translate.x, 0) },
                            { translateY: cond(isActive, translate.y, 0) },
                            { scale: cond(isActive, scale, 1) },
                          ],
                        },
                      ]}
                      {...{ source }}
                    />
                  </View>
                );
              })}
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default WhatsApp;
