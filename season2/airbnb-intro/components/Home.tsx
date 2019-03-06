import * as React from "react";
import { View, ScrollView } from "react-native";

interface HomeProps {}

export default class Home extends React.PureComponent<HomeProps> {
  render() {
    return (
      <ScrollView>
        <Explore />
        <City />
      </ScrollView>
    );
  }
}
