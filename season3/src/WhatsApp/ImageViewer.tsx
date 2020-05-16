import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Clock,
  Value,
  add,
  and,
  block,
  clockRunning,
  cond,
  debug,
  divide,
  eq,
  max,
  multiply,
  neq,
  not,
  or,
  decay as reDecay,
  set,
  startClock,
  stopClock,
  sub,
  useCode,
} from "react-native-reanimated";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import {
  Vector,
  clamp,
  onGestureEvent,
  pinchActive,
  pinchBegan,
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

const decay = ({
  from,
  velocity,
  clock,
}: {
  from: Animated.Node<number>;
  velocity: Animated.Node<number>;
  clock: Animated.Clock;
}) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    velocity: new Value(0),
  };
  const config = { deceleration: 0.998 };
  return block([
    cond(not(clockRunning(clock)), [
      set(state.position, from),
      set(state.velocity, velocity),
      set(state.time, 0),
      set(state.finished, 0),
      startClock(clock),
    ]),
    reDecay(clock, state, config),
    state.position,
  ]);
};

interface ImageViewerProps {
  source: number;
  isActive: Animated.Node<0 | 1>;
  panState: Animated.Node<State>;
  panTranslation: Vector<Animated.Node<number>>;
  panVelocity: Vector<Animated.Node<number>>;
  swipeX: Animated.Value<number>;
}

const ImageViewer = ({
  source,
  isActive,
  panState,
  panTranslation,
  panVelocity,
  swipeX,
}: ImageViewerProps) => {
  const clock1 = new Clock();
  const clock2 = new Clock();
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

  const minVec = vec.min(vec.multiply(-0.5, CANVAS, sub(scale, 1)), 0);
  const maxVec = vec.max(vec.minus(minVec), 0);
  const clamped = vec.sub(
    vec.clamp(vec.add(offset, panTranslation), minVec, maxVec),
    offset
  );
  useCode(
    () =>
      block([
        cond(and(isActive, eq(panState, State.ACTIVE)), [
          set(swipeX, sub(panTranslation.x, clamped.x)),
          vec.set(translation, clamped),
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
            isActive,
            or(eq(state, State.UNDETERMINED), eq(state, State.END)),
            or(eq(panState, State.UNDETERMINED), eq(panState, State.END))
          ),
          [
            vec.set(offset, vec.add(offset, translation)),
            set(scaleOffset, scale),
            set(gestureScale, 1),
            vec.set(translation, 0),
            vec.set(focal, 0),
            vec.set(pinch, 0),
          ]
        ),
        cond(
          and(
            isActive,
            or(eq(panState, State.ACTIVE), eq(state, State.ACTIVE))
          ),
          [stopClock(clock1), stopClock(clock2)]
        ),
        cond(
          and(isActive, eq(panState, State.END), not(eq(state, State.ACTIVE))),
          [
            set(
              offset.x,
              clamp(
                decay({
                  from: offset.x,
                  velocity: panVelocity.x,
                  clock: clock1,
                }),
                minVec.x,
                maxVec.x
              )
            ),
            set(
              offset.y,
              clamp(
                decay({
                  from: offset.y,
                  velocity: panVelocity.y,
                  clock: clock2,
                }),
                minVec.y,
                maxVec.y
              )
            ),
          ]
        ),
        cond(not(isActive), [
          stopClock(clock1),
          stopClock(clock2),
          vec.set(offset, 0),
          set(scaleOffset, 1),
          set(gestureScale, 1),
          vec.set(translation, 0),
          vec.set(focal, 0),
          vec.set(pinch, 0),
        ]),
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
