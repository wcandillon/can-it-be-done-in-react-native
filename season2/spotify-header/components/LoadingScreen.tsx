import * as React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

interface LoadingScreenProps {}

export default class LoadingScreen extends React.PureComponent<LoadingScreenProps> {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
