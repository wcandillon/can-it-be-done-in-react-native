import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PlusSign from "./PlusSign";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingTop: 32,
  },
  plus: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

const StaticTabbar = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: 16 + insets.bottom }]}>
      <Icon name="copy" color="#B9B9C7" size={24} />
      <Icon name="activity" color="#B9B9C7" size={24} />
      <Icon name="x" color="#B9B9C7" size={24} />
      <Icon name="edit-3" color="#B9B9C7" size={24} />
      <Icon name="user" color="#B9B9C7" size={24} />
      <View style={styles.plus}>
        <PlusSign />
      </View>
    </View>
  );
};

export default StaticTabbar;
