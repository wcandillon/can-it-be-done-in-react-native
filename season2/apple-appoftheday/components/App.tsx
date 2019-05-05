import * as React from "react";
import {
  View, StyleSheet, Dimensions, Image, Text,
} from "react-native";
import { DangerZone, GestureHandler } from "expo";
import { runTiming } from "react-native-redash";

import { App, Position } from "./Model";
import AppThumbnail from "./AppThumbnail";

const { Animated, Easing } = DangerZone;
const {
  Clock, Value, event, cond, eq, call,
} = Animated;
const { TapGestureHandler, State } = GestureHandler;
const measure = async (ref: View | Text | ScrollView): Promise<Position> => new Promise(resolve => ref.measureInWindow((x, y, width, height) => resolve({
  x, y, width, height,
})));
const { width, height } = Dimensions.get("window");

export type Apps = App[];

interface AppProps {
  app: App;
  startTransition: (app: App, position: Position) => void;
}

export default class extends React.PureComponent<AppProps> {
  container = React.createRef();

  startTransition = async () => {
    const { app, startTransition } = this.props;
    const position = await measure(this.container.current.getNode());
    startTransition(app, position);
  };

  render() {
    const { app } = this.props;
    const clock = new Clock();
    const state = new Value(State.UNDETERMINED);
    const onHandlerStateChange = event([
      {
        nativeEvent: {
          state,
        },
      },
    ]);
    const duration = 100;
    const easing = Easing.inOut(Easing.ease);
    const beganConfig = { toValue: 0.95, duration, easing };
    const endConfig = { toValue: 1, duration, easing };
    const scale = cond(
      eq(state, State.BEGAN),
      [
        call([], this.startTransition),
        runTiming(clock, 1, beganConfig),
      ],
      cond(
        eq(state, State.FAILED),
        runTiming(clock, 0.95, endConfig),
        1,
      ),
    );
    return (
      <TapGestureHandler {...{ onHandlerStateChange }}>
        <Animated.View ref={this.container} style={{ transform: [{ scale }] }}>
          <AppThumbnail {...{ app }} />
        </Animated.View>
      </TapGestureHandler>
    );
  }
}
