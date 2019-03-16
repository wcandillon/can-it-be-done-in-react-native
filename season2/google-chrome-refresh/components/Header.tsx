import * as React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

interface HeaderProps {}

export default class Header extends React.PureComponent<HeaderProps> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Icon name="plus" size={32} />
          <Icon name="refresh-ccw" size={32} />
          <Icon name="x" size={32} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f1f2",
  },
  content: {
    height: 64,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
