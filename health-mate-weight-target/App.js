// @flow
import React from "react";
import {
  StatusBar, ActivityIndicator, StyleSheet, View,
} from "react-native";
import { Asset } from "expo";

import { WeightTarget } from "./components";

type AppState = {
  ready: boolean,
};

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.PureComponent<{}, AppState> {
  state = {
    ready: false,
  };

  async componentDidMount() {
    await Asset.loadAsync(require("./assets/pinch.png"));
    this.setState({ ready: true });
  }

  render() {
    const { ready } = this.state;
    if (ready) {
      return (
        <React.Fragment>
          <StatusBar barStyle="light-content" />
          <WeightTarget weight={84} height={1.77} />
        </React.Fragment>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#409aee",
  },
});
