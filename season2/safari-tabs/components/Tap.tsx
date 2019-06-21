import * as React from "react";
import Animated from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";

const { Value, useCode, event, block, cond, eq } = Animated;

interface TapProps {
  onPress: Animated.Node<any> | Animated.Node<any>[];
  children: React.ReactElement<typeof Animated.View>;
}

export default ({ onPress, children }: TapProps) => {
  const state = new Value(State.UNDETERMINED);
  const onGestureEvent = event([
    {
      nativeEvent: {
        state
      }
    }
  ]);
  useCode(block([cond(eq(state, State.END), onPress)]), [onPress]);
  return (
    <TapGestureHandler
      onHandlerStateChange={onGestureEvent}
      {...{ onGestureEvent }}
    >
      {children}
    </TapGestureHandler>
  );
};
