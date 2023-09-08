import React from "react";
import { Image, StyleSheet } from "react-native";

import users from "./data/users.json";

interface AvatarProps {
  id: string;
}

export const Avatar = ({ id }: AvatarProps) => {
  const user = users.find((u) => u.id === id)!;
  return <Image source={{ uri: user.picture }} style={styles.avatar} />;
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
