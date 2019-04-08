import * as React from "react";
import { StyleSheet } from "react-native";
import { DangerZone } from "expo";

import NewTaskPart, { TASK_HEIGHT } from "./NewTaskPart";

const { Animated } = DangerZone;
const { Value } = Animated;

interface NewTaskProps {
  translateY: typeof Value;
  scale: typeof Value;
  backgroundColor: string | typeof Value;
}

export default function NewTask({ translateY, scale, backgroundColor } : NewTaskProps) {
  const task = "Create a new Task";
  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <NewTaskPart isOnTop {...{ task, backgroundColor, scale }} />
      <NewTaskPart {...{ task, backgroundColor, scale }} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: TASK_HEIGHT,
  },
});
