import * as React from "react";
import { ScrollView, SafeAreaView } from "react-native";

import Explore from "./Explore";

interface HomeProps {}

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends React.PureComponent<HomeProps> {
  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          <Explore />
        </SafeAreaView>
      </ScrollView>
    );
  }
}
