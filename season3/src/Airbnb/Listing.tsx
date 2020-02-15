import React, { memo } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";
import Animated, {
  Extrapolate,
  Value,
  call,
  cond,
  debug,
  eq,
  interpolate,
  useCode
} from "react-native-reanimated";
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";

import {
  onGestureEvent,
  snapPoint,
  useValues,
  withSpring,
  withSpringTransition
} from "react-native-redash";
import { useMemoOne } from "use-memo-one";
import { Description } from "./components";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const Listing = () => {
  const { goBack } = useNavigation();
  const [translationX, translationY, velocityY, state] = useValues(
    [0, 0, 0, State.UNDETERMINED],
    []
  );
  const snapback = cond(
    eq(state, State.END),
    snapPoint(translationY, velocityY, [0, height]),
    0
  );
  const translateY = cond(snapback, withSpringTransition(0), translationY);
  const translateX = cond(
    eq(state, State.ACTIVE),
    translationX,
    withSpringTransition(0)
  );
  const scale = interpolate(translateY, {
    inputRange: [0, height / 2],
    outputRange: [1, 0.75],
    extrapolate: Extrapolate.CLAMP
  });
  const borderRadius = interpolate(translateY, {
    inputRange: [0, 32],
    outputRange: [0, 16],
    extrapolate: Extrapolate.CLAMP
  });
  const gestureHandler = useMemoOne(
    () => onGestureEvent({ translationX, translationY, velocityY, state }),
    [state, translationX, translationY, velocityY]
  );
  useCode(
    () =>
      cond(
        eq(snapback, height),
        call([], () => goBack())
      ),
    [goBack, snapback]
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "white",
          transform: [{ translateX }, { translateY }, { scale }],
          borderRadius
        }}
      >
        <View>
          <SharedElement id="thumbnail">
            <Animated.Image
              style={{
                height: width,
                width,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius
              }}
              source={require("./assets/tiny-home.jpg")}
            />
          </SharedElement>
        </View>
        <Description />
      </Animated.View>
    </PanGestureHandler>
  );
};

Listing.sharedElements = () => ["thumbnail"];

export default Listing;
