import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StyleGuide } from "../components";

const d = Dimensions.get("window");
export const width = d.width * 0.75;
export const height = d.height * 0.5;
const styles = StyleSheet.create({
  container: {
    width,
    height,
    borderRadius: 24,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  title: {
    fontWeight: "bold",
    marginTop: 16
  },
  handle: {
    color: StyleGuide.palette.primary,
    textDecorationLine: "underline"
  },
  divider: {
    height: 1,
    backgroundColor: "#D8DAE0",
    width: "100%",
    marginVertical: 32
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8
  },
  icon: {
    marginRight: 8
  },
  label: {
    fontSize: 16,
    fontWeight: "500"
  }
});

interface RowProps {
  icon: string;
  label: string;
  href: string;
}

const Row = ({ icon, label, href }: RowProps) => (
  <TouchableOpacity onPress={() => Linking.openURL(href)}>
    <View style={styles.row}>
      <Icon name={icon} size={24} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </View>
  </TouchableOpacity>
);

export default ({ open }) => (
  <View style={styles.container}>
    <LinearGradient style={styles.gradient} colors={["#FEFEFE", "#D2D6DE"]} />
    <TouchableWithoutFeedback onPress={() => open.setValue(0)}>
      <Image source={require("./assets/avatar.jpg")} style={styles.avatar} />
    </TouchableWithoutFeedback>
    <Text style={styles.title}>William Candillon</Text>
    <Text style={styles.handle}>@wcandillon</Text>
    <View style={styles.divider} />
    <View>
      <Row
        icon="code"
        label="Start React Native"
        href="https://start-react-native.dev/"
      />
      <Row
        icon="youtube"
        label="YouTube"
        href="https://www.youtube.com/user/wcandill"
      />
      <Row
        icon="twitter"
        label="Twitter"
        href="https://twitter.com/wcandillon"
      />
    </View>
  </View>
);
