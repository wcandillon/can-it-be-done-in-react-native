import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  title: {
    fontFamily: "GothamRounded-Medium",
    alignSelf: "center",
  },
  action: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "center",
  },
});

const CardHeader = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <Text style={styles.title}>RECOMMEND</Text>
      <View style={styles.action}>
        <Icon name="edit" size={16} />
      </View>
    </View>
  );
};

export default CardHeader;
