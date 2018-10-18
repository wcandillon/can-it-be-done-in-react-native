// @flow
import * as React from 'react';
import {
  StyleSheet, View, SafeAreaView, Text,
} from 'react-native';
import { MapView, Location } from 'expo';

import Monitor from './Monitor';

const { Marker, Polyline } = MapView;

type Position = {
  coords: {
    accuracy: number,
    altitude: number,
      altitudeAccuracy: number,
      heading: number,
      latitude: number,
      longitude: number,
      speed: number,
    },
    timestamp: number,
};

type RunProps = {
  distance: number,
  latitude: number,
  longitude: number,
};

type RunState = {
  positions: Position[],
  duration: number,
  distance: number,
};

export default class Run extends React.PureComponent<RunProps, RunState> {
  state = {
    positions: [],
    duration: 0,
    distance: 0,
  };

  interval;

  watcher: { remove: () => void };

  async componentDidMount() {
    const options = { enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 1 };
    this.watcher = await Location.watchPositionAsync(options, this.onNewPosition);
  }

  componentWillUnmount() {
    this.watcher.remove();
  }

  onNewPosition = (position: Position) => {
    const { positions } = this.state;
    const duration = positions[0] ? position.timestamp - positions[0].timestamp : 0;
    console.log({ duration });
    this.setState({ positions: [...positions, position], duration });
  }

  render(): React.Node {
    const {
      latitude, longitude, distance: totalDistance, pace,
    } = this.props;
    const { positions, distance, duration } = this.state;
    const currentPosition = positions[positions.length - 1];
    return (
      <View style={styles.container}>
        <Monitor {...{
          distance, totalDistance, duration, pace,
        }}
        />
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={currentPosition ? currentPosition.coords : { latitude, longitude }} />
          <Polyline
            strokeColor="#e9ac47"
            strokeWidth={4}
            coordinates={positions.map(position => position.coords)}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
