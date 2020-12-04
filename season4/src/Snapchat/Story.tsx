import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useVector, snapPoint } from "react-native-redash";
import { SharedElement } from "react-navigation-shared-element";
import { Video } from "expo-av";

import { SnapchatRoutes } from "./Model";

interface StoryProps {
  navigation: NavigationProp<SnapchatRoutes, "Story">;
  route: RouteProp<SnapchatRoutes, "Story">;
}

const { height } = Dimensions.get("window");
const AnimatedVideo = Animated.createAnimatedComponent(Video);

const Story = ({ route, navigation }: StoryProps) => {
  const isGestureActive = useSharedValue(false);
  const translation = useVector();
  const { story } = route.params;
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => (isGestureActive.value = true),
    onActive: ({ translationX, translationY }) => {
      translation.x.value = translationX;
      translation.y.value = translationY;
    },
    onEnd: ({ translationY, velocityY }) => {
      const snapBack =
        snapPoint(translationY, velocityY, [0, height]) === height;

      if (snapBack) {
        navigation.goBack();
      } else {
        isGestureActive.value = false;
        translation.x.value = withSpring(0);
        translation.y.value = withSpring(0);
      }
    },
  });
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translation.y.value,
      [0, height],
      [1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      flex: 1,
      transform: [
        { translateX: translation.x.value * scale },
        { translateY: translation.y.value * scale },
        { scale },
      ],
    };
  });
  const borderStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(isGestureActive.value ? 24 : 0),
    };
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        <SharedElement id={story.id} style={{ flex: 1 }}>
          {!story.video && (
            <Animated.Image
              source={story.source}
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                  resizeMode: "cover",
                },
                borderStyle,
              ]}
            />
          )}
          {story.video && (
            <AnimatedVideo
              source={story.video}
              rate={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={[StyleSheet.absoluteFill, borderStyle]}
            />
          )}
        </SharedElement>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Story;
