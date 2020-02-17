import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Entypo as Icon } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    padding: 16,
    overflow: "hidden"
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
    fontFamily: "CerealBook",
    overflow: "hidden"
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  detailText: {
    fontFamily: "CerealBook",
    fontSize: 14,
    color: "grey",
    marginLeft: 4,
    marginRight: 16
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
    <View style={styles.container}>
      <Text style={styles.title}>Tiny House</Text>
      <View style={styles.details}>
        <Icon name="star" color="rgb(255, 56, 92)" size={18} />
        <Text style={styles.detailText}>4.93 (891)</Text>
        <Icon name="medal" color="rgb(255, 56, 92)" size={18} />
        <Text style={styles.detailText}>4.93 (891)</Text>
      </View>
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
        <Text style={styles.text}>
          Lovely tiny house with its own 3 piece bathroom, living room with flat
          screen TV and kitchenette. Has its own deck, barbecue and entranceway
          overlooking the meadow. No pets.
        </Text>
      </View>
    </View>
  );
};
