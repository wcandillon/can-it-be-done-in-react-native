import React from "react";

import Home from "./components/Home";

export default class App extends React.Component {
  render() {
    return (
      <View>

        <Home />
        <Tabbar />
      </View>
    );
  }
}
