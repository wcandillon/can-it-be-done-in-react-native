import React, { memo, useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef
} from "react-native-shared-element";

import { useNavigation } from "react-navigation-hooks";
import { SharedTransitionContext } from "./SharedTransitionContext";

const styles = StyleSheet.create({});

export const Note = memo(({ dispatch }) => {
  const { goBack } = useNavigation();
  return (
    <View
      style={{ flex: 1 }}
      ref={ref => dispatch({ key: "endAncestor", node: nodeFromRef(ref) })}
    >
      <SharedElement onNode={node => dispatch({ key: "endNode", node })}>
        <View
          style={{
            backgroundColor: "blue",
            width: 300,
            height: 300,
            alignSelf: "flex-end"
          }}
        />
      </SharedElement>
      <Button
        title="GO Back"
        onPress={() => {
          goBack();
        }}
      />
    </View>
  );
});

export default () => {
  const [, dispatch] = useContext(SharedTransitionContext);
  return <Note {...{ dispatch }} />;
};
