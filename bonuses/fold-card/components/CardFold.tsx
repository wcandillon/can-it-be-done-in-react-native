import * as React from "react";
import {
  View, ImageSourcePropType, StyleSheet,
} from "react-native";
import { GestureHandler, DangerZone } from "expo";

import { runSpring } from "./AnimationHelpers";
import Face, { CARD_WIDTH, CARD_HEIGHT } from "./Face";

const { Animated } = DangerZone;
const {
  event, Value, Clock, cond, eq,
} = Animated;
const { PinchGestureHandler, State } = GestureHandler;

interface CardFoldProps {
  front: ImageSourcePropType
}

export default class CardFold extends React.PureComponent<CardFoldProps> {
  render() {
    const { front } = this.props;
    const clock = new Clock();
    const scaleRaw = new Value(1);
    const state = new Value(State.UNDETERMINED);
    const onGestureEvent = event([{
      nativeEvent: {
        scale: scaleRaw,
        state,
      },
    }]);
    const scale = cond(eq(state, State.END), runSpring(clock, scaleRaw, 1), scaleRaw);
    return (
      <PinchGestureHandler
        onHandlerStateChange={onGestureEvent}
        {...{ onGestureEvent }}
      >
        <Animated.View style={styles.container}>
          <View style={styles.card}>
            <Face isOnTop {...{ front, scale }} />
            <Face {...{ front, scale }} />
          </View>
        </Animated.View>
      </PinchGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});
