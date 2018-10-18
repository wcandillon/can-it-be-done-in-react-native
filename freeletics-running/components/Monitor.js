// @flow
import * as React from 'react';
import {
  StyleSheet, View, SafeAreaView, Text,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

type ProgressProps = {
  distance: number,
  totalDistance: number,
  duration: number,
  pace: number,
};

export default class Progress extends React.PureComponent<ProgressProps> {
  render(): React.Node {
    const { distance, duration, pace } = this.props;
    return (
      <SafeAreaView style={styles.monitor}>
        <View style={{ height: 200 }}>
          <Text style={{ color: 'white', fontSize: 72 }}>{distance}</Text>
        </View>
        <View style={styles.params}>
          <View>
            <Icon name="watch" color="white" size={28} />
            <Text style={{ color: 'white', fontSize: 28 }}>{pace}</Text>
          </View>
          <View>
            <Icon name="clock" color="white" size={28} />
            <Text style={{ color: 'white', fontSize: 28 }}>{duration}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  monitor: {
    backgroundColor: '#222222',
  },
  params: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
