import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { users } from "./data";
import Story from "./Story";

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#DADADA",
  },
});

export default () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Story label="Your story" picture="https://bit.ly/3avypzV" add />
        {users.map((user) => (
          <Story label={user.id} picture={user.picture} key={user.id} />
        ))}
      </ScrollView>
    </View>
  );
};
