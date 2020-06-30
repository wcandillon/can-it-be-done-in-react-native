import React from "react";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import RippleButton from "./RippleButton";
import { StyleGuide } from "../components";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  touchable: {
    marginVertical: 16,
    width: width - 63,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "400",
    marginLeft: 16,
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <RippleButton color={StyleGuide.palette.primary}>
        <View style={styles.touchable}>
          <Icon name="trash" color="white" size={24} />
          <Text style={[styles.text, { color: "white" }]}>Delete</Text>
        </View>
      </RippleButton>
      <RippleButton color="#DC034E">
        <View style={styles.touchable}>
          <Icon name="send" color="white" size={24} />
          <Text style={[styles.text, { color: "white" }]}>Send</Text>
        </View>
      </RippleButton>
      <RippleButton color="#E0E0E0">
        <View style={styles.touchable}>
          <Icon name="share" size={24} />
          <Text style={styles.text}>Upload</Text>
        </View>
      </RippleButton>
    </View>
  );
};

export default App;
