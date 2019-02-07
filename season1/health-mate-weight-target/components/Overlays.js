// @flow
import * as React from "react";
import { View, StyleSheet } from "react-native";

type OverlaysProps = {
  children: React.Node,
};

export default class Overlays extends React.PureComponent<OverlaysProps> {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        {
          React.Children.map(children, child => (
            <View style={styles.container} pointerEvents="none">
              {child}
            </View>
          ))
        }
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
