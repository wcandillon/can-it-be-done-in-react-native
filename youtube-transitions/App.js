// @flow
/* eslint-disable global-require */
import React from 'react';
import { AppLoading, Asset } from 'expo';

import { Home, PlayerProvider, videos } from './components';

type AppState = {
  ready: boolean,
};

export default class App extends React.PureComponent<{}, AppState> {
  state = {
    ready: false,
  };

  async componentDidMount() {
    await Promise.all(
      videos.map(video => Promise.all([
        Asset.loadAsync(video.video),
        Asset.loadAsync(video.avatar),
        Asset.loadAsync(video.thumbnail),
      ])),
    );
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
      <PlayerProvider>
        <Home />
      </PlayerProvider>
    );
  }
}
