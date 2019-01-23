import React from "react";
import {
  StyleSheet, View,
} from "react-native";
// import { DangerZone } from "expo";

import { Status } from "./components";

// const { Animated } = DangerZone;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Status status="terrible" />
        <Status status="bad" />
        <Status status="ok" />
        <Status status="good" />
        <Status status="great" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
