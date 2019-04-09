import * as React from "react";
import { StyleSheet } from "react-native";
import { DangerZone } from "expo";

import NewTaskPart, { TASK_HEIGHT } from "./NewTaskPart";

const { Animated } = DangerZone;
const { Value, sub, multiply } = Animated;

type Value = typeof Value | string | number;
interface NewTaskProps {
  index: Value;
  scale: Value;
  backgroundColor: Value;
}

export default ({ index, scale, backgroundColor } : NewTaskProps) => {
  const task = "Create a new Task";
  const translateY = sub(multiply(index, TASK_HEIGHT), TASK_HEIGHT / 2);
  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <NewTaskPart isOnTop {...{ task, backgroundColor, scale }} />
      <NewTaskPart {...{ task, backgroundColor, scale }} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: TASK_HEIGHT,
  },
});
