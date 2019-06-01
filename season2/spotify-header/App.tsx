import React from "react";
import { Asset } from "expo-asset";
import { StatusBar } from "react-native";

import LoadingScreen from "./components/LoadingScreen";
import Album from "./components/Album";
import { Album as AlbumModel } from "./components/Model";

const album: AlbumModel = {
  name: "Remote Control",
  artist: "Jan Blomqvist",
  release: 2016,
  // eslint-disable-next-line global-require
  cover: require("./assets/Jan-Blomqvist.jpg"),
  tracks: [
    { name: "Stories Over" },
    { name: "More", artist: "Jan Blomqvist, Elena Pitoulis" },
    { name: "Empty Floor" },
    { name: "Her Great Escape" },
    { name: "Dark Noise" },
    { name: "Drift", artist: "Jan Blomqvist, Aparde" },
    { name: "Same Mistake" },
    { name: "Dancing People Are Never Wrong", artist: "Jan Blomqvist, The Bianca Story" },
    { name: "Back in the Taxi" },
    { name: "Ghosttrack" },
    { name: "Just OK" },
    { name: "The End" },
  ],
};

interface AppProps {}

interface AppState {
  ready: boolean;
}

export default class App extends React.PureComponent<AppProps, AppState> {
  state = {
    ready: false,
  };

  async componentDidMount() {
    await Asset.loadAsync(album.cover);
    this.setState({ ready: true });
  }

  render() {
    const { ready } = this.state;
    if (!ready) {
      return <LoadingScreen />;
    }
    return (
      <>
        <StatusBar barStyle="light-content" />
        <Album {...{ album }} />
      </>
    );
  }
}
