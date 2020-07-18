// @flow
import React from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";

import { Profiles, type Profile } from "./components";

const profiles: Profile[] = [
  {
    id: "1",
    name: "Caroline",
    age: 24,
    profile: require("./assets/profiles/1.jpg"),
  },
  {
    id: "2",
    name: "Jack",
    age: 30,
    profile: require("./assets/profiles/2.jpg"),
  },
  {
    id: "3",
    name: "Anet",
    age: 21,
    profile: require("./assets/profiles/3.jpg"),
  },
  {
    id: "4",
    name: "John",
    age: 28,
    profile: require("./assets/profiles/4.jpg"),
  },
];

type AppState = {
  ready: boolean,
};

export default class App extends React.Component<{}, AppState> {
  state = {
    ready: false,
  };

  async componentDidMount() {
    await Promise.all(profiles.map(profile => Asset.loadAsync(profile.profile)));
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
      <Profiles {...{ profiles }} />
    );
  }
}
