import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Value,
  block,
  cond,
  eq,
  max,
  multiply,
  set,
  useCode,
} from "react-native-reanimated";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import {
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
}

const ImageViewer = ({ source }: ImageViewerProps) => {
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
  useCode(
    () =>
      block([
        cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
        cond(pinchActive(state, numberOfPointers), [
          vec.set(pinch, vec.sub(adjustedFocal, origin)),
          vec.set(
            translation,
            vec.add(pinch, origin, vec.multiply(-1, gestureScale, origin))
          ),
        ]),
        cond(eq(state, State.END), [
          vec.set(offset, vec.add(offset, translation)),
          set(scaleOffset, scale),
          set(gestureScale, 1),
          vec.set(translation, 0),
          vec.set(focal, 0),
          vec.set(pinch, 0),
        ]),
        set(scale, multiply(gestureScale, scaleOffset)),
      ]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
