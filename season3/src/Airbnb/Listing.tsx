import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";
import Animated, {
  Extrapolate,
  and,
  block,
  call,
  cond,
  eq,
  interpolate,
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
import { Feather as Icon } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { Description } from "./components";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width,
    height: width
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 16
  }
});
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
  const snapTo = snapPoint(translationY, velocityY, [0, height]);
  const scale = interpolate(translateY, {
    inputRange: [0, height / 2],
    outputRange: [1, 0.75],
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
                timing({ from: translationX, to: 0, duration: 1000 })
              ),
              set(
                translateY,
                timing({ from: translationY, to: 0, duration: 1000 })
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
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "white",
            transform: [{ translateX }, { translateY }, { scale }]
          }}
        >
          <View>
            <SharedElement id="thumbnail">
              <Image
                style={styles.image}
                resizeMode="cover"
                source={require("./assets/tiny-home.jpg")}
              />
            </SharedElement>
            <SafeAreaView style={styles.thumbnailOverlay}>
              <Icon.Button
                name="x"
                backgroundColor="transparent"
                underlayColor="transparent"
                onPress={() => goBack()}
              />
            </SafeAreaView>
          </View>
          <Description />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Listing;
