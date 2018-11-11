// @flow
import React from 'react';
import { StatusBar } from 'react-native';
import { Asset, AppLoading } from 'expo';
// Two implementations of the story components.
// One using linear interpolation which doesn't make it a perfect cube and one with setNativeProps
import { Stories, Stories2, Stories3 } from './components';

const stories = [
  {
    id: '2',
    source: require('./assets/stories/2.jpg'),
    user: 'derek.russel',
    avatar: require('./assets/avatars/derek.russel.png'),
  },
  {
    id: '4',
    source: require('./assets/stories/4.jpg'),
    user: 'jmitch',
    avatar: require('./assets/avatars/jmitch.png'),
  },
  {
    id: '5',
    source: require('./assets/stories/5.jpg'),
    user: 'monicaa',
    avatar: require('./assets/avatars/monicaa.png'),
  },
  {
    id: '3',
    source: require('./assets/stories/3.jpg'),
    user: 'alexandergarcia',
    avatar: require('./assets/avatars/alexandergarcia.png'),
  },
  {
    id: '1',
    source: require('./assets/stories/1.jpg'),
    user: 'andrea.schmidt',
    avatar: require('./assets/avatars/andrea.schmidt.png'),
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
    await Promise.all(stories.map(story => Promise.all([
      Asset.loadAsync(story.source),
      Asset.loadAsync(story.avatar),
    ])));
    this.setState({ ready: true });
  }

  render() {
    const { ready } = this.state;
    if (!ready) {
      return <AppLoading />;
    }
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <Stories3 {...{ stories }} />
      </React.Fragment>
    );
  }
}
