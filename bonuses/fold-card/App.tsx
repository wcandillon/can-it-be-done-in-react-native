import React from "react";
import { AppLoading, Asset } from "expo";

import CardFold from "./components/CardFold";

interface AppProps {}
interface AppState {
  ready: boolean;
}

const queenOfClub = require("./assets/queen-of-spade.png");

export default class App extends React.Component<AppProps, AppState> {
  state = {
    ready: false,
  };

  async componentDidMount() {
    await Asset.loadAsync(queenOfClub);
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
      <CardFold front={queenOfClub} />
    );
  }
}
