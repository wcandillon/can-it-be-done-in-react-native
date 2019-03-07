import * as React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import TabIcon from "./TabIcon";

interface TabbarProps {}

// eslint-disable-next-line react/prefer-stateless-function
export default class Tabbar extends React.PureComponent<TabbarProps> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <TabIcon label="Explore" icon="search" active />
          <TabIcon label="Saved" icon="heart" />
          <TabIcon label="Trips" icon="map" />
          <TabIcon label="Inbox" icon="message-circle" />
          <TabIcon label="Profile" icon="user" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
  },
  content: {
    flexDirection: "row",
    height: 64,
    borderTopWidth: 1,
    borderColor: "#d6d6d6",
  },
});
