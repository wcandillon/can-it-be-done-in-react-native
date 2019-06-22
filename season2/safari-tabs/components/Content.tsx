import * as React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { snapPoint, spring } from "react-native-redash";

const { width } = Dimensions.get("window");
const { Value, event } = Animated;

interface ContentProps {
  source: number;
}

export default ({ source }: ContentProps) => {
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX,
        velocityX,
        state
      }
    }
  ]);
  const snapPoints = [-width, 0, width];
  const translateX = spring(
    translationX,
    state,
    snapPoint(translateX, velocityX, snapPoints)
  );
  return (
    <PanGestureHandler
      activeOffsetX={[-10, 10]}
      onHandlerStateChange={onGestureEvent}
      {...{ onGestureEvent }}
    >
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <Image style={styles.image} {...{ source }} />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover"
  }
});
