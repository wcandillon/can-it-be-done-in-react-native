// @flow
import React from "react";
import { StatusBar } from "react-native";

import { WeightTarget } from "./components";

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <WeightTarget weight={84} height={1.77} />
      </React.Fragment>
    );
  }
}
