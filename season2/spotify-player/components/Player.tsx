import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    margin: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    padding: 16
  },
  title: {
    color: "white",
    padding: 16
  },
  cover: {
    marginVertical: 16,
    width: width - 32,
    height: width - 32
  }
});

interface PlayerProps {
  onPress: () => void;
}

export default ({ onPress }: PlayerProps) => {
  return (
    <SafeAreaView style={styles.root}>
      <LinearGradient
        colors={["#0b3057", "#051c30"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <RectButton style={styles.button} {...{ onPress }}>
            <Icon name="chevron-down" color="white" size={24} />
          </RectButton>
          <Text style={styles.title}>The Bay</Text>
          <RectButton style={styles.button} {...{ onPress }}>
            <Icon name="more-horizontal" color="white" size={24} />
          </RectButton>
        </View>
        <Image source={require("../assets/thebay.jpg")} style={styles.cover} />
      </View>
    </SafeAreaView>
  );
};
