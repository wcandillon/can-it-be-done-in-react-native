import React from "react";
import { View, StyleSheet } from "react-native";

import Logo from "./Logo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

const DVDLogo = () => {
  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
};

export default DVDLogo;
