import React, { useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  and,
  block,
  cond,
  diff,
  eq,
  multiply,
  neq,
  onChange,
  or,
  set,
  stopClock,
  sub,
  useCode,
} from "react-native-reanimated";
import {
  pinchActive,
  pinchBegan,
  useClock,
  usePanGestureHandler,
  usePinchGestureHandler,
  useValue,
  useVector,
  vec,
} from "react-native-redash";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import { decayVector, useSwiper } from "./AnimationUtil";

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
  const translationX = useValue(0);
  const translateX = useValue(0);
  const pan = usePanGestureHandler();
  useSwiper({ pan, snapPoints, index, translationX, translateX });

  const shouldDecay = useValue(0);
  const clockX = useClock();
  const clockY = useClock();
  const origin = useVector(0, 0);
  const pinch = usePinchGestureHandler();

  const scaleOffset = useValue(1);
  const scale = useValue(1);
  const offset = useVector(0, 0);
  const translation = useVector(0, 0);
  const adjustedFocal = vec.sub(pinch.focal, vec.add(CENTER, offset));

  const minVec = vec.min(vec.multiply(-0.5, CANVAS, sub(scale, 1)), 0);
  const maxVec = vec.max(vec.minus(minVec), 0);
  const clamped = vec.sub(
    vec.clamp(vec.add(offset, pan.translation), minVec, maxVec),
    offset
  );
  useCode(
    () =>
      block([
        // Calculate the extra value left to send to the swiper
        cond(eq(pan.state, State.ACTIVE), [
          vec.set(translation, clamped),
          set(translationX, sub(pan.translation.x, clamped.x)),
        ]),
        // PinchBegan: the focal value is the transformation of origin
        cond(pinchBegan(pinch.state), vec.set(origin, adjustedFocal)),
        // PinchActive, the focal value (minus its value at began) is the translation
        cond(pinchActive(pinch.state, pinch.numberOfPointers), [
          vec.set(
            translation,
            vec.add(
              vec.sub(adjustedFocal, origin),
              origin,
              vec.multiply(-1, pinch.scale, origin)
            )
          ),
        ]),
        // Gesture ended, keep offset, reset values,
        cond(
          and(
            or(eq(pinch.state, State.UNDETERMINED), eq(pinch.state, State.END)),
            or(eq(pan.state, State.UNDETERMINED), eq(pan.state, State.END))
          ),
          [
            vec.set(offset, vec.add(offset, translation)),
            set(scaleOffset, scale),
            set(pinch.scale, 1),
            vec.set(translation, 0),
            vec.set(pinch.focal, 0),
          ]
        ),
        // Decay animation (when releasing the pan gesture within the active image)
        cond(or(eq(pan.state, State.ACTIVE), eq(pinch.state, State.ACTIVE)), [
          stopClock(clockX),
          stopClock(clockY),
          set(shouldDecay, 0),
        ]),
        cond(
          and(
            neq(diff(pan.state), 0),
            eq(pan.state, State.END),
            neq(pinch.state, State.ACTIVE)
          ),
          set(shouldDecay, 1)
        ),
        cond(shouldDecay, [
          vec.set(
            offset,
            vec.clamp(
              decayVector(offset, pan.velocity, clockX, clockY),
              minVec,
              maxVec
            )
          ),
        ]),
        // Reset states when the image is not active anymore
        onChange(index, [
          stopClock(clockX),
          stopClock(clockY),
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
