import React from "react";
import {
  StyleSheet, SafeAreaView, View, ScrollView,
} from "react-native";

import App, { Apps } from "./components/App";

const apps: Apps = [
  {
    id: "yoga",
    title: "Namaste",
    subtitle: "Best Yoga apps for the summer",
    source: require("./assets/images/yoga.jpg"),
    content: "",
  },

  {
    id: "fitness",
    title: "Get Fit",
    subtitle: "Wear it while you work out",
    source: require("./assets/images/fitness.jpg"),
    content: "",
  },
];

export default () => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      {
        apps.map(app => (
          <App key={app.id} {...{ app }} />
        ))
      }
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
