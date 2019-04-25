import React from "react";
import {
  StyleSheet, SafeAreaView, View, ScrollView,
} from "react-native";

import App, { Apps } from "./components/App";

const apps: Apps = [];

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
