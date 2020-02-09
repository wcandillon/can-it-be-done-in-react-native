import React, { memo, useContext } from "react";
import { Button, StyleSheet, Text, View, ViewBase } from "react-native";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef
} from "react-native-shared-element";

import { useNavigation } from "react-navigation-hooks";
import { useMemoOne } from "use-memo-one";
import { StyleGuide } from "../components";
import { SharedTransitionContext } from "./SharedTransitionContext";

const styles = StyleSheet.create({});

const Home = memo(({ dispatch }) => {
  const { navigate } = useNavigation();
  return (
    <View
      style={{ flex: 1 }}
      ref={ref => dispatch({ key: "startAncestor", node: nodeFromRef(ref) })}
    >
      <SharedElement onNode={node => dispatch({ key: "startNode", node })}>
        <View style={{ backgroundColor: "blue", width: 300, height: 300 }} />
      </SharedElement>
      <Button
        title="GO"
        onPress={() => {
          navigate("Note");
        }}
      />
    </View>
  );
});

export default () => {
  const [, dispatch] = useContext(SharedTransitionContext);
  return <Home {...{ dispatch }} />;
};
