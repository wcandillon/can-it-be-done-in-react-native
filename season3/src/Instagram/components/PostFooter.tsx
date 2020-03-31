import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  actions: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  username: {
    fontWeight: "500",
    fontSize: 16
  },
  leftActions: {
    flexDirection: "row"
  },
  icon: {
    marginRight: 16
  },
  caption: {
    marginLeft: 16,
    marginBottom: 8
  },
  likes: {
    marginLeft: 16,
    marginBottom: 16,
    fontWeight: "500"
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

interface PostFooterProps {
  likes: number;
  caption: string;
}

export default ({ likes, caption }: PostFooterProps) => {
  return (
    <>
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <Icon name="heart" size={24} style={styles.icon} />
          <Icon name="message-circle" size={24} style={styles.icon} />
          <Icon name="send" size={24} style={styles.icon} />
        </View>
        <Icon name="bookmark" size={24} />
      </View>
      <Text style={styles.caption}>{caption}</Text>
      <Text style={styles.likes}>{`${likes} likes`}</Text>
    </>
  );
};
