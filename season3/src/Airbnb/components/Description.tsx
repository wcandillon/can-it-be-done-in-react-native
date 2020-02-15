import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: "CerealBook",
    marginBottom: 16
  },
  text: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "CerealBook"
  },
  smallDivider: {
    height: 1,
    backgroundColor: "#DCDDDE",
    marginVertical: 16,
    width: width * 0.25
  },
  divider: {
    height: 1,
    backgroundColor: "#DCDDDE",
    marginVertical: 16
  },
  host: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 76 / 2
  },
  mediumText: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "CerealMedium"
  }
});

export default () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tiny House</Text>
      <View>
        <Text style={styles.text}>
          Light and airy living room interior of tiny home in Upstate, New York.
        </Text>
        <View style={styles.smallDivider} />
        <View style={styles.host}>
          <View>
            <Text style={styles.mediumText}>Tiny House</Text>
            <Text style={styles.mediumText}>Hosted by Eliza</Text>
          </View>
          <Image style={styles.avatar} source={require("../assets/host.jpg")} />
        </View>
        <View style={styles.divider} />
      </View>
    </ScrollView>
  );
};
