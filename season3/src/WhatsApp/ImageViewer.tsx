import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Value,
  and,
  block,
  cond,
  debug,
  divide,
  eq,
  max,
  multiply,
  not,
  or,
  set,
  sub,
  useCode,
} from "react-native-reanimated";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import {
  clamp,
  onGestureEvent,
  pinchActive,
  pinchBegan,
  timing,
  translate,
  vec,
} from "react-native-redash";

const { width, height } = Dimensions.get("window");
export const CANVAS = vec.create(width, height);
const CENTER = vec.divide(CANVAS, 2);
const styles = StyleSheet.create({
  container: {
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

interface ImageViewerProps {
  source: number;
  isActive: Animated.Node<0 | 1>;
  panState: Animated.Node<State>;
  translationX: Animated.Node<number>;
  translationY: Animated.Node<number>;
  swipeX: Animated.Value<number>;
}

const ImageViewer = ({
  source,
  isActive,
  panState,
  translationX,
  translationY,
  swipeX,
}: ImageViewerProps) => {
  const origin = vec.createValue(0);
  const pinch = vec.createValue(0);
  const focal = vec.createValue(0);
  const gestureScale = new Value(1);
  const numberOfPointers = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const pinchGestureHandler = onGestureEvent({
    numberOfPointers,
    scale: gestureScale,
    state,
    focalX: focal.x,
    focalY: focal.y,
  });

  const scaleOffset = new Value(1);
  const scale = new Value(1);
  const offset = vec.createValue(0);
  const translation = vec.createValue(0);
  const adjustedFocal = vec.sub(focal, vec.add(CENTER, offset));

  const panEnd = and(isActive, eq(panState, State.END));
  const minVec = vec.min(vec.multiply(-0.5, CANVAS, sub(scale, 1)), 0);
  const maxVec = vec.max(vec.minus(minVec), 0);
  const clamped = clamp(
    translationX,
    sub(minVec.x, offset.x),
    sub(maxVec.x, offset.x)
  );

  useCode(
    () =>
      block([
        cond(and(isActive, eq(panState, State.ACTIVE)), [
          set(swipeX, sub(translationX, clamped)),
          set(translation.x, clamped),
          set(translation.y, translationY),
        ]),
        cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
        cond(pinchActive(state, numberOfPointers), [
          vec.set(pinch, vec.sub(adjustedFocal, origin)),
          vec.set(
            translation,
            vec.add(pinch, origin, vec.multiply(-1, gestureScale, origin))
          ),
        ]),
        cond(
          and(
            eq(state, State.END),
            or(not(isActive), and(isActive, eq(panState, State.END)))
          ),
          [
            vec.set(offset, vec.add(offset, translation)),
            set(scaleOffset, scale),
            set(gestureScale, 1),
            vec.set(translation, 0),
            vec.set(focal, 0),
            vec.set(pinch, 0),
            set(
              offset.x,
              timing({
                from: offset.x,
                to: clamp(offset.x, minVec.x, maxVec.x),
              })
            ),
            set(
              offset.y,
              timing({
                from: offset.y,
                to: clamp(offset.y, minVec.y, maxVec.y),
              })
            ),
            set(
              scaleOffset,
              timing({ from: scaleOffset, to: max(scaleOffset, 1) })
            ),
          ]
        ),
        set(scale, multiply(gestureScale, scaleOffset)),
      ]),
    []
  );
  return (
    <View style={styles.container}>
      <PinchGestureHandler {...pinchGestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
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
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};

export default ImageViewer;
