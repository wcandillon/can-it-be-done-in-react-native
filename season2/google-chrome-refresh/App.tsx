import React from "react";
import { StatusBar } from "react-native";
import { AppLoading, Asset } from "expo";

import BrowserTab from "./components/BrowserTab";

interface AppProps {}
interface AppState {
  ready: boolean;
}

export default class App extends React.Component<AppProps, AppState> {
  state = {
    ready: false,
  };

  async componentDidMount() {
    await Asset.loadAsync(require("./assets/image.jpg"));
    this.setState({ ready: true });
  }

  render() {
    const { ready } = this.state;
    if (!ready) {
      return (
        <AppLoading />
      );
    }
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <BrowserTab />
      </>
    );
  }
}
