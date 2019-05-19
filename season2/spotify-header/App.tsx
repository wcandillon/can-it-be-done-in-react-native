import React from "react";
import { Asset, AppLoading } from "expo";

import Album, { Album as AlbumModel } from "./components/Album";

const album: AlbumModel = {
  name: "Remote Control",
  artist: "Jan Blomqvist",
  release: 2016,
  // eslint-disable-next-line global-require
  cover: require("./assets/Jan-Blomqvist-Remote-Control.jpg"),
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
      return (
        <AppLoading />
      );
    }
    return (
      <Album {...{ album }} />
    );
  }
}
