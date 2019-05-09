import * as React from "react";
import {
  Text, StyleSheet, ScrollView, View,
} from "react-native";

export default () => (
  <View style={styles.container}>
    <ScrollView>
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
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  paragraph: {
    fontSize: 24,
    marginBottom: 16,
  },
});
