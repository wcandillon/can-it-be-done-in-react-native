// @flow
import * as _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import {
  StyleSheet, View, SafeAreaView, Text,
} from 'react-native';
import { Svg } from 'expo';
import { Feather as Icon } from '@expo/vector-icons';
import SVGPath from 'art/modes/svg/path';
import * as path from 'svg-path-properties';

const { Path } = Svg;
const radius = 100;
const strokeWidth = 20;
const d = SVGPath()
  .moveTo(strokeWidth, radius + strokeWidth)
  .arcTo(radius * 2, radius + strokeWidth, radius)
  .toSVG();
const properties = path.svgPathProperties(d);
const length = properties.getTotalLength();

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
    const { distance, pace, totalDistance } = this.props;
    const { duration } = this.state;
    const ratio = distance === 0 ? 0 : distance / totalDistance;
    return (
      <SafeAreaView style={styles.monitor}>
        <View style={styles.progressContainer}>
          <Svg style={styles.progressBar}>
            <Path
              stroke="white"
              fill="transparent"
              {...{ d, strokeWidth }}
            />
            <Path
              stroke="#e9ac47"
              fill="transparent"
              strokeDasharray={length}
              strokeDashoffset={length - (ratio * length)}
              {...{ d, strokeWidth }}
            />
          </Svg>
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabel}>{_.round(distance)}</Text>
          </View>
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
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    height: radius * 2 + strokeWidth,
    width: radius * 2 + strokeWidth,
  },
  progressLabelContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressLabel: {
    color: 'white',
    fontSize: 72,
    marginTop: 64,
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
    fontVariant: ['tabular-nums'],
  },
});
