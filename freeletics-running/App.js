// @flow
import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { Permissions, Location } from 'expo';

import { Run } from './components';

export default class App extends React.PureComponent<{}, { longitude: number | null, latitude: number | null }> {
  state = {
    longitude: null,
    latitude: null,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      console.log({ latitude, longitude });
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
          (longitude !== null && latitude !== null) && <Run distance={200} {...{ longitude, latitude }} />
        }
      </React.Fragment>
    );
  }
}
