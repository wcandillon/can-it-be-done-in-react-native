import React, { useRef } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

const { width: wWidth } = Dimensions.get("window");

const SNAP_POINTS = [-wWidth, 0, wWidth];
const aspectRatio = 430.94 / 228.14;
const CARD_WIDTH = wWidth - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;

interface CardProps {
  card: {
    width: number;
    height: number;
    source: ReturnType<typeof require>;
  };
  trigger: Animated.SharedValue<boolean>;
  index: number;
}

const Card = ({
  card: { source, width, height },
  trigger,
  index,
}: CardProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(-10 + Math.random() * 20);
  useAnimatedReaction(
    () => trigger.value,
    (v) => {
      console.log({ v });
      if (v) {
        const duration = 150 + 150 * index;
        translateX.value = withTiming(0, { duration }, () => {
          trigger.value = false;
        });
        rotateZ.value = withTiming(-10 + Math.random() * 20, {
          duration,
        });
      }
    }
  );
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
      rotateZ.value = withTiming(0);
      scale.value = withTiming(1.1);
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = ctx.x + translationX;
      translateY.value = ctx.y + translationY;
    },
    onEnd: ({ velocityX, velocityY }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: velocityX });
      translateY.value = withSpring(0, { velocity: velocityY }, () => {
        if (index === 0) {
          trigger.value = true;
        }
      });
      scale.value = withTiming(1);
    },
  });
  const style = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1500 },
      { rotateX: "30deg" },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateY: `${rotateZ.value / 10}deg` },
      { rotateZ: `${rotateZ.value}deg` },
      { scale: scale.value },
    ],
  }));
  return (
    <View style={styles.container} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={onGestureEvent} minDist={0}>
        <Animated.View style={[styles.card, style]}>
          <Image
            source={source}
            style={{
              width: IMAGE_WIDTH,
              height: (IMAGE_WIDTH * height) / width,
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Card;
