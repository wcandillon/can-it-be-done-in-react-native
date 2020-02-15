import React from "react";
import { Dimensions, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";
import Animated, {
  Extrapolate,
  and,
  block,
  call,
  cond,
  debug,
  diff,
  eq,
  interpolate,
  multiply,
  neq,
  not,
  set,
  useCode
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import {
  onGestureEvent,
  snapPoint,
  timing,
  useValues
} from "react-native-redash";
import { useMemoOne } from "use-memo-one";

import { Description } from "./components";

const { width, height } = Dimensions.get("window");

const Listing = () => {
  const { goBack } = useNavigation();
  const [
    translationX,
    translationY,
    velocityY,
    translateX,
    translateY,
    snapBack,
    state
  ] = useValues([0, 0, 0, 0, 0, 0, State.UNDETERMINED], []);
  const snapTo = snapPoint(translationY, velocityY, [height, height]);
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
      block([
        set(
          snapBack,
          and(eq(state, State.END), eq(snapTo, height), not(snapBack))
        ),
        cond(
          snapBack,
          call([], () => goBack()),
          cond(
            eq(state, State.END),
            [
              set(
                translateX,
                timing({ from: translationX, to: 0, duration: 3000 })
              ),
              set(
                translateY,
                timing({ from: translationY, to: 0, duration: 3000 })
              )
            ],
            [set(translateY, translationY), set(translateX, translationX)]
          )
        )
      ]),
    [
      goBack,
      snapBack,
      snapTo,
      state,
      translateX,
      translateY,
      translationX,
      translationY
    ]
  );
  return (
    <View style={{ flex: 1 }}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius
          }}
        >
          <View>
            <SharedElement id="thumbnail">
              <Animated.Image
                style={{
                  height: width,
                  width,
                  top: translateY,
                  left: translateX,
                  borderTopLeftRadius: borderRadius,
                  borderTopRightRadius: borderRadius,
                  resizeMode: "cover"
                }}
                source={require("./assets/tiny-home.jpg")}
              />
            </SharedElement>
          </View>
          <Description />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Listing;
