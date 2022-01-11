import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

const { width: wWidth, height } = Dimensions.get("window");

const SNAP_POINTS = [-wWidth, 0, wWidth];
const aspectRatio = 722 / 368;
const CARD_WIDTH = wWidth - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;

interface CardProps {
  card: {
    source: ReturnType<typeof require>;
  };
  shuffleBack: Animated.SharedValue<boolean>;
  index: number;
}

export const Card = ({ card: { source }, shuffleBack, index }: CardProps) => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(-height);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);
  const delay = index * DURATION;
  const theta = -10 + Math.random() * 20;
  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: DURATION, easing: Easing.inOut(Easing.ease) })
    );
    rotateZ.value = withDelay(delay, withSpring(theta));
  }, [delay, index, rotateZ, theta, translateY]);
  useAnimatedReaction(
    () => shuffleBack.value,
    (v) => {
      if (v) {
        const duration = 150 * index;
        translateX.value = withDelay(
          duration,
          withSpring(0, {}, () => {
            shuffleBack.value = false;
          })
        );
        rotateZ.value = withDelay(duration, withSpring(theta));
      }
    }
  );
  const gesture = Gesture.Pan()
    .onBegin(() => {
      offset.value.x = translateX.value;
      offset.value.y = translateY.value;
      rotateZ.value = withTiming(0);
      scale.value = withTiming(1.1);
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = offset.value.x + translationX;
      translateY.value = offset.value.y + translationY;
    })
    .onEnd(({ velocityX, velocityY }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: velocityX });
      translateY.value = withSpring(0, { velocity: velocityY });
      scale.value = withTiming(1, {}, () => {
        const isLast = index === 0;
        const isSwipedLeftOrRight = dest !== 0;
        if (isLast && isSwipedLeftOrRight) {
          shuffleBack.value = true;
        }
      });
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
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, style]}>
          <Image
            source={source}
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_WIDTH * aspectRatio,
            }}
            resizeMode="contain"
          />
        </Animated.View>
      </GestureDetector>
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
