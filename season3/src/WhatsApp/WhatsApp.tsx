import React, { useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  block,
  cond,
  eq,
  multiply,
  onChange,
  set,
  sub,
  useCode,
} from "react-native-reanimated";
import {
  usePanGestureHandler,
  usePinchGestureHandler,
  useValue,
  useVector,
  vec,
} from "react-native-redash";
import {
  PanGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import { useDecay, usePinch, useSwiper } from "./AnimationUtil";

const { width, height } = Dimensions.get("window");
export const CANVAS = vec.create(width, height);
const CENTER = vec.divide(CANVAS, 2);
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
  const pinchRef = useRef<PinchGestureHandler>(null);
  const panRef = useRef<PanGestureHandler>(null);

  const index = useValue(0);
  const translateX = useValue(0);
  const pan = usePanGestureHandler();

  const pinch = usePinchGestureHandler();

  const scaleOffset = useValue(1);
  const scale = useValue(1);
  const offset = useVector(0, 0);
  const translation = useVector(0, 0);

  const minVec = vec.min(vec.multiply(-0.5, CANVAS, sub(scale, 1)), 0);
  const maxVec = vec.max(vec.minus(minVec), 0);

  useSwiper({
    pan,
    snapPoints,
    index,
    translateX,
    minVec,
    maxVec,
    translation,
    offset,
  });
  usePinch({
    pinch,
    pan,
    offset,
    translation,
    scale,
    scaleOffset,
    center: CENTER,
  });
  useDecay({ pinch, pan, offset, minVec, maxVec });
  useCode(
    () =>
      block([
        // Reset states when the image is not active anymore
        onChange(index, [
          vec.set(offset, 0),
          set(scaleOffset, 1),
          set(pinch.scale, 1),
          vec.set(translation, 0),
          vec.set(pinch.focal, 0),
        ]),
        // Calulate scale
        set(scale, multiply(pinch.scale, scaleOffset)),
      ]),
    []
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
                const tr = vec.add(offset, translation);
                const isActive = eq(index, i);
                return (
                  <View key={i} style={styles.picture}>
                    <Animated.Image
                      style={[
                        styles.image,
                        {
                          transform: [
                            { translateX: cond(isActive, tr.x, 0) },
                            { translateY: cond(isActive, tr.y, 0) },
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
