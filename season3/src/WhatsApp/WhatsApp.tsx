import React from "react";
import { StyleSheet, View } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  block,
  debug,
  diffClamp,
  useCode
} from "react-native-reanimated";
import { onGestureEvent, useValues } from "react-native-redash";
import { withScaleOffset } from "./AnimatedHelpers";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined
  }
});

export default () => {
  const [state, scaling, focalX, focalY] = useValues(
    [State.UNDETERMINED, 1, 0, 0],
    []
  );
  const gestureHandler = onGestureEvent({
    state,
    scale: scaling,
    focalX,
    focalY
  });
  const s = diffClamp(withScaleOffset(scaling, state), 1, 8);
  useCode(() => block([debug("focalX", focalX), debug("focalY", focalY)]), [
    focalX,
    focalY
  ]);
  return (
    <View style={styles.container}>
      <PinchGestureHandler {...gestureHandler}>
        <Animated.Image
          style={[
            styles.image,
            {
              transform: [{ scale: s }]
            }
          ]}
          source={require("./assets/pic1.jpg")}
        />
      </PinchGestureHandler>
    </View>
  );
};
