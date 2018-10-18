// @flow
import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { MapView, Location } from 'expo';

type Position = {
  coords: {
    accuracy: number,
    altitude: 393.6201477050781,
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

export default class Run extends React.PureComponent<RunProps> {
  componentDidMount() {
    Location.watchPositionAsync({ enableHighAccuracy: true, timeInterval: 1000 }, this.onNewPosition);
  }

  onNewPosition = (position: Position) => {
    console.log({ position });
  }

  render(): React.Node {
    const { latitude, longitude } = this.props;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.monitor} />
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.01,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  monitor: {
    flex: 0.39,
    backgroundColor: '#222222',
  },
  map: {
    flex: 0.61,
  },
});
