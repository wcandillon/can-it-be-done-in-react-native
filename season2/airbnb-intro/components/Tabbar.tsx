import * as React from "react";
import { View, StyleSheet } from "react-native";

import TabIcon from "./TabIcon";

interface TabbarProps {}

export default class Tabbar extends React.PureComponent<TabbarProps> {
  render() {
    return (
      <View style={styles.container}>
        <TabIcon label="Explore" icon="search" active />
        <TabIcon label="Saved" icon="heart" />
        <TabIcon label="Trips" icon="map" />
        <TabIcon label="Inbox" icon="message-circle" />
        <TabIcon label="Profile" icon="user" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 64,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderColor: "#d6d6d6",
  },
});
