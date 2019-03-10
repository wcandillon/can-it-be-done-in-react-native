import * as React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";

interface TabbarProps {}

export default class Tabbar extends React.PureComponent<TabbarProps> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.tabbar} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
  },
  tabbar: {
    height: 64,
  },
});
