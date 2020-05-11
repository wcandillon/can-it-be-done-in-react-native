import React, { ReactNode } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Value,
  and,
  block,
  cond,
  eq,
  event,
  max,
  multiply,
  set,
  sub,
  useCode,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import {
  Vector,
  clamp,
  onGestureEvent,
  pinchActive,
  pinchBegan,
  timing,
  vec,
} from "react-native-redash";

const { width, height } = Dimensions.get("window");
export const CANVAS = vec.create(width, height);
const CENTER = vec.divide(CANVAS, 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

interface PinchGestureProps {
  pan: Vector<Animated.Value<number>>;
  panState: Animated.Value<number>;
  panGestureHandler: {
    onHandlerStateChange: (...args: unknown[]) => void;
    onGestureEvent: (...args: unknown[]) => void;
  };
  scale: Animated.Value<number>;
  translate: Vector<Animated.Value<number>>;
  children: ReactNode;
}

const PinchGesture = ({
  children,
  scale,
  translate,
  panGestureHandler,
  pan,
  panState,
}: PinchGestureProps) => {
  const origin = vec.createValue(0);
  const focal = vec.createValue(0);
  const gestureScale = new Value(1);
  const numberOfPointers = new Value(0);
  const pinchState = new Value(State.END);
  const pinchGestureHandler = onGestureEvent({
    numberOfPointers,
    scale: gestureScale,
    state: pinchState,
    focalX: focal.x,
    focalY: focal.y,
  });

  const scaleOffset = new Value(1);
  const minVec = vec.min(vec.multiply(-0.5, CANVAS, sub(scale, 1)), 0);
  const maxVec = vec.max(vec.minus(minVec), 0);
  const offset = vec.createValue(0);
  const translation = vec.createValue(0);
  const adjustedFocal = vec.sub(focal, vec.add(CENTER, offset));
  useCode(
    () =>
      block([
        cond(
          eq(panState, State.ACTIVE),
          vec.set(translation, vec.clamp(pan, minVec, maxVec))
        ),
        cond(pinchBegan(pinchState), vec.set(origin, adjustedFocal)),
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
        cond(and(eq(pinchState, State.END), eq(panState, State.END)), [
          vec.set(offset, vec.add(offset, translation)),
          set(scaleOffset, scale),
          set(gestureScale, 1),
          vec.set(translation, 0),
          vec.set(focal, 0),
        ]),
        set(scale, multiply(gestureScale, scaleOffset)),
        vec.set(translate, vec.add(offset, translation)),
      ]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <View style={styles.container}>
      <PinchGestureHandler {...pinchGestureHandler}>
        <Animated.View style={StyleSheet.absoluteFillObject}>
          <PanGestureHandler {...panGestureHandler}>
            <Animated.View style={StyleSheet.absoluteFill}>
              {children}
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};

export default PinchGesture;
