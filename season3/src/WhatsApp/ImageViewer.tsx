import React, { RefObject } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Clock,
  Value,
  and,
  block,
  cond,
  diff,
  eq,
  multiply,
  neq,
  not,
  or,
  set,
  stopClock,
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
  pinchActive,
  pinchBegan,
  translate,
  usePinchGestureHandler,
  useValue,
  useVector,
  vec,
} from "react-native-redash";
import { decayVector } from "./AnimationUtil";

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
  panTranslation: Vector<Animated.Node<number>>;
  panVelocity: Vector<Animated.Node<number>>;
  swipeX: Animated.Value<number>;
  panRef: RefObject<PanGestureHandler>;
  pinchRef: RefObject<PinchGestureHandler>;
}

const ImageViewer = ({
  source,
  isActive,
  panState,
  panTranslation,
  panVelocity,
  swipeX,
  panRef,
  pinchRef,
}: ImageViewerProps) => {
  const shouldDecay = useValue(0);
  const clock = vec.create(new Clock(), new Clock());
  const origin = useVector(0, 0);
  const {
    gestureHandler,
    state,
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
    vec.clamp(vec.add(offset, panTranslation), minVec, maxVec),
    offset
  );
  useCode(
    () =>
      block([
        // Calculate the extra value left to send to the swiper
        cond(and(isActive, eq(panState, State.ACTIVE)), [
          set(swipeX, sub(panTranslation.x, clamped.x)),
          set(translation.x, clamped.x),
        ]),
        // PinchBegan: the focal value is the transformation of origin
        cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
        // PinchActive, the focal value (minus its value at began) is the translation
        cond(pinchActive(state, numberOfPointers), [
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
          ]
        ),
        // Decay animation (when releasing the pan gesture within the active image)
        cond(
          and(
            isActive,
            or(eq(panState, State.ACTIVE), eq(state, State.ACTIVE))
          ),
          [stopClock(clock.x), stopClock(clock.y), set(shouldDecay, 0)]
        ),
        cond(
          and(
            isActive,
            neq(diff(panState), 0),
            eq(panState, State.END),
            neq(state, State.ACTIVE)
          ),
          set(shouldDecay, 1)
        ),
        cond(shouldDecay, [
          vec.set(
            offset,
            vec.clamp(decayVector(offset, panVelocity, clock), minVec, maxVec)
          ),
        ]),
        // Reset states when the image is not active anymore
        cond(not(isActive), [
          stopClock(clock.x),
          stopClock(clock.y),
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
    <View style={styles.container}>
      <PinchGestureHandler
        simultaneousHandlers={panRef}
        ref={pinchRef}
        {...gestureHandler}
      >
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
