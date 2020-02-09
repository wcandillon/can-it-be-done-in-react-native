import React, { useContext } from "react";
import { Button, StyleSheet, Text, View, ViewBase } from "react-native";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef
} from "react-native-shared-element";

import { useNavigation } from "react-navigation-hooks";
import { StyleGuide } from "../components";
import { SharedTransitionContext } from "./SharedTransitionContext";

const styles = StyleSheet.create({});

export default () => {
  const { navigate } = useNavigation();
  const [, dispatch] = useContext(SharedTransitionContext);
  return (
    <View
      style={{ flex: 1 }}
      ref={ref => dispatch({ key: "startAncestor", node: nodeFromRef(ref) })}
    >
      <SharedElement onNode={node => dispatch({ key: "startNode", node })}>
        <View style={{ backgroundColor: "blue", width: 300, height: 300 }} />
      </SharedElement>
      <Button title="GO" onPress={() => navigate("note")} />
    </View>
  );
};
