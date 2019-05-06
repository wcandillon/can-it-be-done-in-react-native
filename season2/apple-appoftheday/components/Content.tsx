import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { DangerZone } from "expo";

const { Animated } = DangerZone;
const { Value } = Animated;

export default () => (
  <Animated.View style={styles.container}>
    <Text style={styles.paragraph}>
      <Text style={{ fontWeight: "bold" }}>Lorem ipsum</Text>
      {" "}
      dolor sit amet, consectetur adipiscing elit.
      Proin nec dolor sed enim consequat consequat.
    </Text>
    <Text style={styles.paragraph}>
      Phasellus porta risus id leo consequat fermentum.
      Cras sed justo ac odio malesuada malesuada.
    </Text>
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  paragraph: {
    fontSize: 24,
    marginBottom: 16,
  },
});
