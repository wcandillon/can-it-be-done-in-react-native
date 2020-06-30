import React from "react";
import { StyleSheet, Text, View } from "react-native";

import RippleButton from "./RippleButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  touchable: {
    flex: 0.5,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
  },
  text: { alignSelf: "center", fontSize: 30 },
});

const App = () => {
  return (
    <View style={styles.container}>
      <RippleButton color="cyan" onPress={() => alert("OK")}>
        <View style={styles.touchable}>
          <Text style={styles.text}>TouchableNativeFeedback</Text>
        </View>
      </RippleButton>
    </View>
  );
};

export default App;
