import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Value,
  add,
  block,
  cond,
  cos,
  eq,
  multiply,
  set,
  sin,
  sub,
  useCode,
} from "react-native-reanimated";
import { RotationGestureHandler, State } from "react-native-gesture-handler";
import {
  Vector,
  onGestureEvent,
  pinchActive,
  pinchBegan,
  translate,
  vec,
} from "react-native-redash";

const { width, height } = Dimensions.get("window");
const CANVAS = vec.create(width, height);
const CENTER = vec.divide(CANVAS, 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
});

const withRotate = (v: Vector, theta: Animated.Adaptable<number>) => ({
  x: sub(multiply(v.x, cos(theta)), multiply(v.y, sin(theta))),
  y: add(multiply(v.x, sin(theta)), multiply(v.y, cos(theta))),
});

export default () => {
  const origin = vec.createValue(0, 0);
  const pinch = vec.createValue(0, 0);
  const focal = vec.createValue(0, 0);
  const rotation = new Value(0);
  const rotateOffset = new Value(0);
  const rotate = new Value(0);
  const offset = vec.createValue(0, 0);
  const state = new Value(State.UNDETERMINED);
  const numberOfPointers = new Value(0);
  const pinchGestureHandler = onGestureEvent({
    numberOfPointers,
    rotation,
    state,
    anchorX: focal.x,
    anchorY: focal.y,
  });
  const adjustedFocal = vec.sub(focal, vec.add(CENTER, offset));
  const translation = vec.createValue(0, 0);
  useCode(
    () =>
      block([
        cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
        cond(pinchActive(state, numberOfPointers), [
          vec.set(pinch, vec.sub(adjustedFocal, origin)),
          vec.set(
            translation,
            vec.add(
              pinch,
              origin,
              withRotate(vec.multiply(-1, origin), rotation)
            )
          ),
        ]),
        cond(eq(state, State.END), [
          vec.set(offset, vec.add(offset, translation)),
          set(rotateOffset, rotate),
          set(rotation, 0),
          vec.set(translation, 0),
          vec.set(focal, 0),
          vec.set(pinch, 0),
        ]),
        set(rotate, add(rotation, rotateOffset)),
      ]),
    [
      adjustedFocal,
      focal,
      numberOfPointers,
      offset,
      origin,
      pinch,
      rotate,
      rotateOffset,
      rotation,
      state,
      translation,
    ]
  );
  return (
    <View style={styles.container}>
      <RotationGestureHandler {...pinchGestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.Image
            style={[
              styles.image,
              {
                transform: [
                  ...translate(vec.add(offset, translation)),
                  { rotate },
                ],
              },
            ]}
            source={require("./assets/zurich.jpg")}
          />
        </Animated.View>
      </RotationGestureHandler>
    </View>
  );
};
