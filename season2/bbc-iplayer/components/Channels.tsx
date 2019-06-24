import * as React from "react";
import { View, StyleSheet } from "react-native";

import CircularSelection from "./CircularSelection";
import { IChannel } from "./Model";

interface ChannelsProps {
  channels: IChannel[];
}

export default ({ channels }: ChannelsProps) => {
  return (
    <View style={styles.container}>
      <View />
      <CircularSelection {...{ channels }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#1abc9c" // "#1a1b1c"
  }
});
