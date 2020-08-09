import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

import { phones, SIZE } from "./Phones";
import { RectButton } from "react-native-gesture-handler";
import Phone from "./Phone";

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
  const [stack, setStack] = useState([phones[0]]);
  const phone = stack[stack.length - 1];
  return (
    <View style={styles.container}>
      <View style={styles.picture}>
        {stack.map((p) => (
          <Phone key={p.id} phone={p} />
        ))}
      </View>
      <Text style={styles.title}>{phone.name}</Text>
      <View style={styles.colors}>
        {phones.map((p) => (
          <RectButton
            key={p.id}
            onPress={() => {
              if (p.id !== phone.id) {
                setStack([phone, p]);
              }
            }}
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
