import React, { useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  add,
  and,
  block,
  clockRunning,
  cond,
  diff,
  divide,
  eq,
  floor,
  multiply,
  neq,
  not,
  onChange,
  or,
  set,
  stopClock,
  sub,
  useCode,
} from "react-native-reanimated";
import {
  clamp,
  pinchActive,
  pinchBegan,
  snapPoint,
  timing,
  translate,
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
import { decayVector } from "./AnimationUtil";

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
  const clock = useClock();
  const index = useValue(0);
  const offsetX = useValue(0);
  const translationX = useValue(0);
  const translateX = useValue(0);
  const pan = usePanGestureHandler();
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
          set(index, floor(divide(translateX, -width))),
        ]),
      ]),
    ],
    []
  );
  const shouldDecay = useValue(0);
  const clockX = useClock();
  const clockY = useClock();
  const origin = useVector(0, 0);
  const {
    gestureHandler: pinchGestureHandler,
    state: pinchState,
    numberOfPointers,
    scale: gestureScale,
    focal,
  } = usePinchGestureHandler();

  const scaleOffset = useValue(1);
  const scale = useValue(1);
  const offset = useVector(0, 0);
  const translation = useVector(0, 0);
  const adjustedFocal = vec.sub(focal, vec.add(CENTER, offset));

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
        cond(pinchBegan(pinchState), vec.set(origin, adjustedFocal)),
        // PinchActive, the focal value (minus its value at began) is the translation
        cond(pinchActive(pinchState, numberOfPointers), [
          vec.set(
            translation,
            vec.add(
              vec.sub(adjustedFocal, origin),
              origin,
              vec.multiply(-1, gestureScale, origin)
            )
          ),
        ]),
        // Gesture ended, keep offset, reset values,
        cond(
          and(
            or(eq(pinchState, State.UNDETERMINED), eq(pinchState, State.END)),
            or(eq(pan.state, State.UNDETERMINED), eq(pan.state, State.END))
          ),
          [
            vec.set(offset, vec.add(offset, translation)),
            set(scaleOffset, scale),
            set(gestureScale, 1),
            vec.set(translation, 0),
            vec.set(focal, 0),
          ]
        ),
        // Decay animation (when releasing the pan gesture within the active image)
        cond(or(eq(pan.state, State.ACTIVE), eq(pinchState, State.ACTIVE)), [
          stopClock(clockX),
          stopClock(clockY),
          set(shouldDecay, 0),
        ]),
        cond(
          and(
            neq(diff(pan.state), 0),
            eq(pan.state, State.END),
            neq(pinchState, State.ACTIVE)
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
        cond(0, [
          stopClock(clockX),
          stopClock(clockY),
          vec.set(offset, 0),
          set(scaleOffset, 1),
          set(gestureScale, 1),
          vec.set(translation, 0),
          vec.set(focal, 0),
        ]),
        // Calulate scale
        set(scale, multiply(gestureScale, scaleOffset)),
      ]),
    []
  );
  return (
    <PinchGestureHandler
      ref={pinchRef}
      simultaneousHandlers={panRef}
      {...pinchGestureHandler}
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
              {assets.map((source, i) => (
                <View key={i} style={styles.picture}>
                  <Animated.Image
                    style={[
                      styles.image,
                      {
                        transform: [
                          ...translate(vec.add(offset, translation)),
                          { scale },
                        ],
                      },
                    ]}
                    {...{ source }}
                  />
                </View>
              ))}
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default WhatsApp;
