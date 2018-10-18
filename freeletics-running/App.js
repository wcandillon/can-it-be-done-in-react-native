// @flow
import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { Permissions, Location } from 'expo';

import { Run, Loading } from './components';

export default class App extends React.PureComponent<{}, { longitude: number, latitude: number }> {
  state = {
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      this.setState({ longitude, latitude });
    } else {
      alert("We couldn't get your location");
    }
  }

  render() {
    const { longitude, latitude } = this.state;
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        {
          !longitude && <Loading />
        }
        {
          !!longitude && <Run distance={200} {...{ longitude, latitude }} />
        }
      </React.Fragment>
    );
  }
}
