import React, { memo, useContext } from "react";
import { StyleSheet, View } from "react-native";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef
} from "react-native-shared-element";

import { SharedTransitionContext } from "./SharedTransitionContext";

const styles = StyleSheet.create({});

export const Note = memo(({ dispatch }) => {
  return (
    <View
      style={{ flex: 1 }}
      ref={ref => dispatch({ key: "endAncestor", node: nodeFromRef(ref) })}
    >
      <SharedElement
        style={{ flex: 1 }}
        onNode={node => dispatch({ key: "endNode", node })}
      >
        <View style={{ backgroundColor: "blue", width: 500, height: 500 }} />
      </SharedElement>
    </View>
  );
});

export default () => {
  const [, dispatch] = useContext(SharedTransitionContext);
  return <Note {...{ dispatch }} />;
};
