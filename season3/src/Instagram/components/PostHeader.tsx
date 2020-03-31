import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  username: {
    fontWeight: "500",
    fontSize: 16
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8
  },
  header: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  }
});

interface PostHeaderProps {
  avatar: string;
  username: string;
}

export default ({ avatar, username }: PostHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <Icon name="more-horizontal" size={24} />
    </View>
  );
};
