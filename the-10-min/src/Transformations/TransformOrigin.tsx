import React from "react";
import { StyleSheet, View } from "react-native";

import Card, { CARD_WIDTH, Cards } from "./components/Card";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default () => {
  return (
    <>
      <View style={styles.overlay}>
        <View
          style={{
            transform: [
              { translateX: -CARD_WIDTH / 2 },
              { rotateZ: `${Math.PI / 6}rad` },
              { translateX: CARD_WIDTH / 2 },
            ],
          }}
        >
          <Card type={Cards.Card2} />
        </View>
      </View>
      <View style={styles.overlay}>
        <View
          style={{
            transform: [],
          }}
        >
          <Card type={Cards.Card3} />
        </View>
      </View>
      <View style={styles.overlay}>
        <View
          style={{
            transform: [
              { translateX: -CARD_WIDTH / 2 },
              { rotateZ: `${-Math.PI / 6}rad` },
              { translateX: CARD_WIDTH / 2 },
            ],
          }}
        >
          <Card type={Cards.Card1} />
        </View>
      </View>
    </>
  );
};
