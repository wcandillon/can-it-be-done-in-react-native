import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Stories from "./components/Stories";

export default class App extends React.Component {
  render() {
    return (
      <Stories />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
