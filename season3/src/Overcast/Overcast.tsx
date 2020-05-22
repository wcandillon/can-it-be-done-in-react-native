import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { StyleGuide } from "../components";

import SwipeableRow from "./SwipeableRow";

const styles = StyleSheet.create({
  row: {
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    ...StyleGuide.typography.title1,
  },
  caption: {
    ...StyleGuide.typography.caption,
  },
  description: {
    ...StyleGuide.typography.body,
  },
});

const Overcast = () => {
  return (
    <ScrollView>
      <SwipeableRow
        onPress={() => alert("Pressed!")}
        onSwipe={() => alert("Swiped!")}
      >
        <View style={styles.row}>
          <Text style={styles.title}>Scrott Teaches Web Svelte and Sapper</Text>
          <Text style={styles.caption}>20 MAY - PLAYED</Text>
          <Text style={styles.description}>
            In this episode of Syntax, Scott teaches Wes about Svelte and Sapper
            — general premise, best practices, and more!
          </Text>
        </View>
      </SwipeableRow>
      <SwipeableRow
        onPress={() => alert("Pressed!")}
        onSwipe={() => alert("Swiped!")}
      >
        <View style={styles.row}>
          <Text style={styles.title}>Scrott Teaches Web Svelte and Sapper</Text>
          <Text style={styles.caption}>20 MAY - PLAYED</Text>
          <Text style={styles.description}>
            In this episode of Syntax, Scott teaches Wes about Svelte and Sapper
            — general premise, best practices, and more!
          </Text>
        </View>
      </SwipeableRow>
      <SwipeableRow
        onPress={() => alert("Pressed!")}
        onSwipe={() => alert("Swiped!")}
      >
        <View style={styles.row}>
          <Text style={styles.title}>Scrott Teaches Web Svelte and Sapper</Text>
          <Text style={styles.caption}>20 MAY - PLAYED</Text>
          <Text style={styles.description}>
            In this episode of Syntax, Scott teaches Wes about Svelte and Sapper
            — general premise, best practices, and more!
          </Text>
        </View>
      </SwipeableRow>
      <SwipeableRow
        onPress={() => alert("Pressed!")}
        onSwipe={() => alert("Swiped!")}
      >
        <View style={styles.row}>
          <Text style={styles.title}>Scrott Teaches Web Svelte and Sapper</Text>
          <Text style={styles.caption}>20 MAY - PLAYED</Text>
          <Text style={styles.description}>
            In this episode of Syntax, Scott teaches Wes about Svelte and Sapper
            — general premise, best practices, and more!
          </Text>
        </View>
      </SwipeableRow>
      <SwipeableRow
        onPress={() => alert("Pressed!")}
        onSwipe={() => alert("Swiped!")}
      >
        <View style={styles.row}>
          <Text style={styles.title}>Scrott Teaches Web Svelte and Sapper</Text>
          <Text style={styles.caption}>20 MAY - PLAYED</Text>
          <Text style={styles.description}>
            In this episode of Syntax, Scott teaches Wes about Svelte and Sapper
            — general premise, best practices, and more!
          </Text>
        </View>
      </SwipeableRow>
      <SwipeableRow
        onPress={() => alert("Pressed!")}
        onSwipe={() => alert("Swiped!")}
      >
        <View style={styles.row}>
          <Text style={styles.title}>Scrott Teaches Web Svelte and Sapper</Text>
          <Text style={styles.caption}>20 MAY - PLAYED</Text>
          <Text style={styles.description}>
            In this episode of Syntax, Scott teaches Wes about Svelte and Sapper
            — general premise, best practices, and more!
          </Text>
        </View>
      </SwipeableRow>
    </ScrollView>
  );
};

export default Overcast;
