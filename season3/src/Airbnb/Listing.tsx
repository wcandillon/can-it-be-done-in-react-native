import React, { memo } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";
import Animated, {
  Extrapolate,
  Value,
  and,
  call,
  cond,
  debug,
  eq,
  interpolate,
  set,
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
  spring,
  timing,
  useValues
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
  const snapTo = snapPoint(translationY, velocityY, [0, height]);
  const translateY = translationY;
  const translateX = translationX;
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
        and(eq(state, State.END), eq(snapTo, height)),
        call([], () => goBack()),
        cond(
          eq(state, State.END),
          [
            set(
              translateX,
              timing({ from: translationX, to: 0, duration: 5000 })
            ),
            set(
              translateY,
              timing({ from: translationY, to: 0, duration: 5000 })
            )
          ],
          [set(translateY, translationY), set(translateX, translationX)]
        )
      ),
    [goBack, snapTo, state, translateX, translateY, translationX, translationY]
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
