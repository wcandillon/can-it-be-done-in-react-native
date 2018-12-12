// @flow
import * as React from 'react';

import { type Video } from './videos';

type PlayerProviderProps = {
  children: React.Node,
};

type PlayerProviderState = {
  video: Video | null,
};


// $FlowFixMe
export const PlayerContext = React.createContext();

export default class PlayerProvider extends React.PureComponent<PlayerProviderProps, PlayerProviderState> {
  state = {
    video: null,
  };

  setVideo = (video: Video | null) => {
    this.setState({ video });
  }

  render() {
    const { setVideo } = this;
    const { children } = this.props;
    const { video } = this.state;
    return (
      <PlayerContext.Provider value={{ video, setVideo }}>
        {children}
      </PlayerContext.Provider>
    );
  }
}
