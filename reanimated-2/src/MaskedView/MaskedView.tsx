import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import RNMaskedView from "@react-native-community/masked-view";
import Animated from "react-native-reanimated";

import { phones, SIZE } from "./Phones";
import { RectButton } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picture: {
    width: SIZE,
    height: SIZE,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  title: {
    textAlign: "center",
  },
  colors: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    width: width / 4,
    height: width / 4,
    alignSelf: "center",
    justifyContent: "center",
  },
  dot: { width: 20, height: 20, borderRadius: 10 },
});

const MaskedView = () => {
  const [phone, setPhone] = useState(phones[0]);
  return (
    <View style={styles.container}>
      <View style={styles.picture}>
        <Image source={require("./assets/red.png")} style={styles.background} />
        <RNMaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "black",
                width: undefined,
                height: undefined,
                transform: [{ scale: 0.5 }, { translateY: SIZE / 2 }],
                borderRadius: SIZE / 2,
              }}
            />
          }
        >
          <Image source={phone.picture} style={styles.background} />
        </RNMaskedView>
      </View>
      <Text style={styles.title}>{phone.name}</Text>
      <View style={styles.colors}>
        {phones.map((p) => (
          <RectButton
            key={p.id}
            onPress={() => setPhone(p)}
            style={styles.button}
          >
            <View style={[styles.dot, { backgroundColor: p.color }]} />
          </RectButton>
        ))}
      </View>
    </View>
  );
};

export default MaskedView;
