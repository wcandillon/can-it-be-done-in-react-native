import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { DangerZone } from "expo";

const { Animated } = DangerZone;
const { Value } = Animated;
export const TASK_HEIGHT = 64;

interface TaskProps {
  task: string;
  backgroundColor: string | typeof Value;
}

export default class Task extends React.PureComponent<TaskProps> {
  render() {
    const { task, backgroundColor } = this.props;
    return (
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <Text style={styles.text}>{task}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: TASK_HEIGHT,
    justifyContent: "center",
    padding: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
