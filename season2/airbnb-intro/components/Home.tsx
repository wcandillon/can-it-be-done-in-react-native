import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import Explore from "./Explore";

interface HomeProps {}

export default class Home extends React.PureComponent<HomeProps> {
  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <Explore />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
});
