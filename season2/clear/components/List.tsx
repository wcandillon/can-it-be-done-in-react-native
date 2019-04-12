import interpolate from "color-interpolate";
import * as React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { GestureHandler, DangerZone } from "expo";

import Header, { HEADER_HEIGHT } from "./Header";
import Task, { TASK_HEIGHT } from "./Task";
import NewTask from "./NewTask";
import { runSpring, interpolateColors } from "./AnimatedHelpers";

interface ListProps {
  tasks: string[];
}

const { PinchGestureHandler, State } = GestureHandler;
const { Animated } = DangerZone;
const {
  event, Value, block, eq, cond, Clock, set, multiply, lessThan, divide, sub, round, debug, diff, and, mutiply, neq,
} = Animated;
const colors = ["#C52B27", "#E1B044"];
const palette = interpolate(colors);

export default class List extends React.PureComponent<ListProps> {
  render() {
    const { tasks } = this.props;
    const step = 1 / tasks.length;
    const clock = new Clock();
    const pinchScale = new Value(0);
    const pinchFocalY = new Value(0);
    const focalY = new Value(0);
    const scale = new Value(0);
    const state = new Value(State.UNDETERMINED);
    const onGestureEvent = event([{
      nativeEvent: {
        scale: pinchScale,
        focalY: pinchFocalY,
        state,
      },
    }]);
    const backgroundColor = interpolateColors(
      multiply(step, divide(sub(focalY, HEADER_HEIGHT), TASK_HEIGHT)),
      [0, 1],
      colors,
    );
    const index = round(divide(focalY, TASK_HEIGHT));
    const scaleFactor = multiply(scale, TASK_HEIGHT / 4);
    // See: https://github.com/kmagiera/react-native-gesture-handler/issues/553
    const pinchBegan = Platform.OS === "ios"
      ? eq(state, State.BEGAN)
      : eq(diff(state), State.ACTIVE - State.BEGAN);
    const getPinchScale = Platform.OS === "ios"
      ? pinchScale
      : cond(eq(state, State.BEGAN), 0, pinchScale);
    return (
      <View style={styles.container}>
        <Animated.Code>
          {
            () => block([
              cond(pinchBegan, set(focalY, pinchFocalY)),
              set(scale, cond(eq(state, State.END), runSpring(clock, pinchScale, 0), getPinchScale)),
            ])
          }
        </Animated.Code>
        <Header />
        <PinchGestureHandler
          onHandlerStateChange={onGestureEvent}
          {...{ onGestureEvent }}
        >
          <Animated.View>
            <NewTask
              {...{ backgroundColor, scale, index }}
            />
            {
              tasks.map((task, key) => {
                const isOnTop = lessThan(key, index);
                const translateY = multiply(scaleFactor, cond(isOnTop, -1, 1));
                const bgColor = palette(step * key);
                return (
                  <Animated.View style={{ transform: [{ translateY }] }} {...{ key }}>
                    <Task
                      backgroundColor={bgColor}
                      {...{ task }}
                    />
                  </Animated.View>
                );
              })
            }
          </Animated.View>
        </PinchGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
