import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

import { phones, SIZE } from "./Phones";
import { RectButton } from "react-native-gesture-handler";
import Phone from "./Phone";
import Button from "./Button";

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
    padding: 16,
    fontSize: 24,
    lineHeight: 30,
    textAlign: "center",
  },
  colors: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const MaskedView = () => {
  const [stack, setStack] = useState([phones[0]]);
  const phone = stack[stack.length - 1];
  return (
    <View style={styles.container}>
      <View style={styles.picture}>
        {stack.map((p, index) => (
          <Phone key={index} phone={p} />
        ))}
      </View>
      <Text style={styles.title}>{phone.name}</Text>
      <View style={styles.colors}>
        {phones.map((p) => (
          <Button
            key={p.id}
            backgroundColor={p.color}
            onPress={() => {
              if (p.id !== phone.id) {
                setStack([...stack, p]);
              }
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default MaskedView;
