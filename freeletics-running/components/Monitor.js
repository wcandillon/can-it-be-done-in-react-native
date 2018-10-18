// @flow
import * as _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import {
  StyleSheet, View, SafeAreaView, Text,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

type ProgressProps = {
  distance: number,
  totalDistance: number,
  pace: number,
};

type ProgressState = {
  duration: number,
};

const formatDuration = (seconds: number) => moment.utc(moment.duration(seconds, 's').asMilliseconds()).format('mm:ss');

export default class Progress extends React.PureComponent<ProgressProps, ProgressState> {
  state = {
    duration: 0,
  };

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ duration: this.state.duration + 1 }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(): React.Node {
    const { distance, pace } = this.props;
    const { duration } = this.state;
    return (
      <SafeAreaView style={styles.monitor}>
        <View style={{ height: 200 }}>
          <Text style={{ color: 'white', fontSize: 72 }}>{_.round(distance)}</Text>
        </View>
        <View style={styles.params}>
          <View style={styles.row}>
            <Icon name="watch" color="white" size={28} />
            <Text style={styles.value}>{formatDuration(pace)}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="clock" color="white" size={28} />
            <Text style={styles.value}>{formatDuration(duration)}</Text>
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
  row: {
    flexDirection: 'row',
  },
  value: {
    marginLeft: 16,
    color: 'white',
    fontSize: 28,
  },
});
