import interpolate from "color-interpolate";
import * as React from "react";
import { View, StyleSheet } from "react-native";
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
  event, Value, block, eq, cond, Clock, set, multiply, lessThan, divide, sub, floor, debug, add, round,
} = Animated;
const colors = ["#C52B27", "#E1B044"];
const palette = interpolate(colors);

export default class List extends React.PureComponent<ListProps> {
  render() {
    const { tasks } = this.props;
    const step = 1 / tasks.length;
    const clock = new Clock();
    const scaleRaw = new Value(0);
    const focalYRaw = new Value(0);
    const focalY = new Value(0);
    const scale = new Value(0);
    const state = new Value(State.UNDETERMINED);
    const onGestureEvent = event([{
      nativeEvent: {
        scale: scaleRaw,
        focalY: focalYRaw,
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
    return (
      <View style={styles.container}>
        <Animated.Code>
          {
            () => block([
              cond(eq(state, State.BEGAN), set(focalY, focalYRaw)),
              set(scale, cond(eq(state, State.END), runSpring(clock, scaleRaw, 0), scaleRaw)),
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
              translateY={sub(multiply(index, TASK_HEIGHT), TASK_HEIGHT / 2)}
              {...{ backgroundColor, scale }}
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
