import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef
} from "react-native-shared-element";

import { SharedTransitionContext } from "./SharedTransitionContext";

const styles = StyleSheet.create({});

export default () => {
  const [, dispatch] = useContext(SharedTransitionContext);
  return (
    <View
      style={{ flex: 1 }}
      ref={ref => dispatch({ key: "endAncestor", node: nodeFromRef(ref) })}
    >
      <SharedElement onNode={node => dispatch({ key: "endNode", node })}>
        <View style={{ backgroundColor: "blue", flex: 1 }} />
      </SharedElement>
    </View>
  );
};
