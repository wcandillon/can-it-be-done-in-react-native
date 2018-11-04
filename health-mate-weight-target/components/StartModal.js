// @flow
import * as React from "react";
import {
  View, Image, Text, StyleSheet, Dimensions,
} from "react-native";

import Overlays from "./Overlays";

const backgroundColor = "#409aee";
const { width, height } = Dimensions.get("window");

type StartModalProps = {
  children: React.Node,
};

export default class StartModal extends React.PureComponent<StartModalProps> {
  render() {
    const { children } = this.props;
    return (
      <Overlays>
        <View style={styles.container} pointEvents="none">
          <Text style={styles.title}>What is the target weight (kg) that you would like to reach?</Text>
          <Text style={styles.subtitle}>Drag the bubble  to set your target weight</Text>
        </View>
        {children}
        <Image
          style={{
            width: 100, height: 100, resizeMode: "contain", alignSelf: "flex-end", marginRight: 16,
          }}
          source={require("../assets/pinch.png")}
        />
      </Overlays>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor,
  },
  title: {
    color: "white",
    fontSize: 24,
    width: 300,
    textAlign: "center",
  },
  subtitle: {
    width: 150,
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
});
