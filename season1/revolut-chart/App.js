// @flow
import React from 'react';
import {
  StyleSheet, View, Dimensions, SafeAreaView, Animated, TextInput, StatusBar,
} from 'react-native';
import { Svg } from 'expo';

import * as shape from 'd3-shape';

import * as path from 'svg-path-properties';

import {
  scaleLinear,
  scaleTime,
  scaleQuantile,
} from 'd3-scale';

const d3 = {
  shape,
};

const {
  Path, Defs, LinearGradient, Stop,
} = Svg;
const { width } = Dimensions.get('window');
const height = 200;
const cursorRadius = 10;
const data = [
  { x: new Date(2018, 9, 1), y: 0 },
  { x: new Date(2018, 9, 16), y: 0 },
  { x: new Date(2018, 9, 17), y: 200 },
  { x: new Date(2018, 10, 1), y: 200 },
  { x: new Date(2018, 10, 2), y: 300 },
  { x: new Date(2018, 10, 5), y: 300 },
];

const scaleX = scaleTime().domain([new Date(2018, 9, 1), new Date(2018, 10, 5)]).range([0, width]);
const scaleY = scaleLinear().domain([0, 300]).range([height - 10, 10]);
const scaleLabel = scaleQuantile().domain(data.map(d => d.x)).range(data.map(d => d.y));

const line = d3.shape.line()
  .x(d => scaleX(d.x))
  .y(d => scaleY(d.y))
  .curve(d3.shape.curveBasis)(data);

const properties = path.svgPathProperties(line);
const totalLength = properties.getTotalLength();

export default class App extends React.Component {
  cursor = React.createRef();

  label = React.createRef();

  state = {
    x: new Animated.Value(0),
  };

  update(top, left) {
    this.cursor.current.setNativeProps({ top: top - cursorRadius, left: left - cursorRadius });
    const text = scaleLabel(scaleX.invert(left));
    this.label.current.setNativeProps({ text: `${text} CHF` });
  }

  componentDidMount() {
    const { x } = this.state;
    x.addListener(({ value }) => requestAnimationFrame(() => {
      const { x: left, y: top } = properties.getPointAtLength(totalLength - value);
      this.update(top, left);
    }));
    const { y: top, x: left } = properties.getPointAtLength(totalLength);
    this.update(top, left);
  }

  render() {
    const { x } = this.state;
    const translateX = x.interpolate({
      inputRange: [0, totalLength],
      outputRange: [width - 100, 0],
      extrapolate: 'clamp',
    });
    return (
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Svg {...{ width, height }}>
            <Defs>
              <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                <Stop offset="0%" stopColor="#cee3f9" />
                <Stop offset="80%" stopColor="#ddedfa" />
                <Stop offset="100%" stopColor="#feffff" />
              </LinearGradient>
            </Defs>
            <Path d={`${line}L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
            <Path d={line} fill="transparent" stroke="#3977e3" strokeWidth={5} />
          </Svg>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.label, { transform: [{ translateX }, { translateY: -45 }] }]}>
              <TextInput underlineColorAndroid="transparent" ref={this.label} />
            </Animated.View>
          </View>
          <View style={StyleSheet.absoluteFill}>
            <View ref={this.cursor} style={styles.cursor} />
          </View>
          <Animated.ScrollView
            style={StyleSheet.absoluteFill}
            contentContainerStyle={{ width: totalLength * 2 }}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x },
                  },
                },
              ],
              { useNativeDriver: true },
            )}
            horizontal
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    marginTop: 80,
    width,
    height,
  },
  label: {
    backgroundColor: 'lightgray',
    width: 100,
  },
  cursor: {
    borderWidth: 5,
    borderColor: '#3977e3',
    backgroundColor: 'white',
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
  },
});
