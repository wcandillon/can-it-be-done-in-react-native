import React, { useMemo } from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { snapPoint, spring } from "react-native-redash";

const { width } = Dimensions.get("window");
const { Value, event, useCode, abs, cond, eq, call } = Animated;
const EXTREMITY = width * 1.1;
const snapPoints = [-EXTREMITY, 0, EXTREMITY];

interface ContentProps {
  source: number;
  closeTab: () => void;
}

export default ({ source, closeTab }: ContentProps) => {
  const { translationX, velocityX, state } = useMemo(
    () => ({
      translationX: new Value(0),
      velocityX: new Value(0),
      state: new Value(State.UNDETERMINED)
    }),
    []
  );
  const { onGestureEvent, translateX } = useMemo(
    () => ({
      onGestureEvent: event([
        {
          nativeEvent: {
            translationX,
            velocityX,
            state
          }
        }
      ]),
      translateX: spring(
        translationX,
        state,
        snapPoint(translationX, velocityX, snapPoints)
      )
    }),
    [state, translationX, velocityX]
  );
  useCode(cond(eq(abs(translateX), EXTREMITY), call([], closeTab)), [
    translateX,
    closeTab
  ]);
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
