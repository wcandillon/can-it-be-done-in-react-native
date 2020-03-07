import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  View
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: width * 0.75,
    height: height * 0.5,
    borderRadius: 24,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  divider: {}
});

interface RowProps {
  icon: string;
  label: string;
  href: string;
}

const Row = ({ icon, label, href }: RowProps) => (
  <TouchableOpacity onPress={() => Linking.openURL(href)}>
    <View>
      <Icon name={icon} />
      <Text>{label}</Text>
    </View>
  </TouchableOpacity>
);

export default () => {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/avatar.jpg")} style={styles.avatar} />
      <Text>William Candillon</Text>
      <Text>https://www.youtube.com/user/wcandill</Text>
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
};
