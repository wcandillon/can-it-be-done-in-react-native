import React, { memo, useContext } from "react";
import { Button, StyleSheet, Text, View, ViewBase } from "react-native";
import { SharedElement, nodeFromRef } from "react-native-shared-element";

import { useNavigation } from "react-navigation-hooks";

import { useSharedTransitionDispatch } from "./SharedTransitionContext";

const styles = StyleSheet.create({});

export default () => {
  const dispatch = useSharedTransitionDispatch();
  const { navigate } = useNavigation();
  return (
    <View
      style={{ flex: 1 }}
      ref={ref =>
        ref && dispatch({ key: "startAncestor", node: nodeFromRef(ref) })
      }
    >
      <SharedElement
        onNode={node => node && dispatch({ key: "startNode", node })}
      >
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
};
