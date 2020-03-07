import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Value,
  block,
  debug,
  diffClamp,
  multiply,
  sub,
  useCode
} from "react-native-reanimated";
import { onGestureEvent, useValues, withOffset } from "react-native-redash";
import { withScaleOffset } from "./AnimatedHelpers";

const { width, height } = Dimensions.get("window");
const middleX = width / 2;
const middleY = height / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined
  }
});

export default () => {
  const [state, scaling, focalX, focalY] = useValues(
    [State.UNDETERMINED, 1, middleX, middleY],
    []
  );
  const gestureHandler = onGestureEvent({
    state,
    scale: scaling,
    focalX,
    focalY
  });
  const scale = diffClamp(withScaleOffset(scaling, state), 1, 4);
  const x = multiply(focalX, scale);
  const y = multiply(focalY, scale);
  const translateX = diffClamp(sub(middleX, x), 0, width);
  const translateY = diffClamp(sub(middleY, y), 0, height);
  return (
    <View style={styles.container}>
      <PinchGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.Image
            style={[
              styles.image,
              {
                transform: [{ translateX }, { translateY }, { scale }]
              }
            ]}
            source={require("./assets/pic1.jpg")}
          />
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};
