// @flow
import React from 'react';
import {
  StyleSheet, View, Dimensions, Animated, TextInput,
} from 'react-native';
import { Svg } from 'expo';
import * as path from 'svg-path-properties';
import * as shape from 'd3-shape';

import {
  scaleTime,
  scaleLinear,
  scaleQuantile,
} from 'd3-scale';

const {
  Path, Defs, LinearGradient, Stop,
} = Svg;
const d3 = {
  shape,
};

const height = 200;
const { width } = Dimensions.get('window');
const verticalPadding = 5;
const cursorRadius = 10;
const labelWidth = 100;

export default class Chart extends React.Component {
  cursor = React.createRef();

  label = React.createRef();

  state = {
    x: new Animated.Value(0),
    ready: false,
  };

  moveCursor(value) {
    const { x, y } = this.properties.getPointAtLength(this.lineLength - value);
    if (this.cursor.current) {
      this.cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius });
    }
    if (this.label.current) {
      const label = this.scaleLabel(this.scaleY.invert(y));
      this.label.current.setNativeProps({ text: `${label} CHF` });
    }
  }

  componentDidMount() {
    const { data } = this.props;
    const scaleX = scaleTime().domain([new Date(2018, 9, 1), new Date(2018, 10, 5)]).range([0, width]);
    this.scaleY = scaleLinear().domain([0, 300]).range([height - verticalPadding, verticalPadding]);
    this.scaleLabel = scaleQuantile().domain([0, 300]).range([0, 200, 300]);
    this.line = d3.shape.line()
      .x(d => scaleX(d.x))
      .y(d => this.scaleY(d.y))
      .curve(d3.shape.curveBasis)(data);
    this.properties = path.svgPathProperties(this.line);
    this.lineLength = this.properties.getTotalLength();
    this.setState({ ready: true }, () => {
      this.state.x.addListener(({ value }) => this.moveCursor(value));
      this.moveCursor(0);
    });
  }

  render() {
    const { line, lineLength } = this;
    const { ready, x } = this.state;
    if (!ready) {
      return null;
    }
    const translateX = x.interpolate({
      inputRange: [0, lineLength],
      outputRange: [width - labelWidth, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.container}>
        <Svg {...{ width, height }}>
          <Defs>
            <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
              <Stop stopColor="#CDE3F8" offset="0%" />
              <Stop stopColor="#eef6fd" offset="80%" />
              <Stop stopColor="#FEFFFF" offset="100%" />
            </LinearGradient>
          </Defs>
          <Path d={line} fill="transparent" stroke="#367be2" strokeWidth={5} />
          <Path d={`${line} L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
          <View ref={this.cursor} style={styles.cursor} />
        </Svg>
        <Animated.View style={[styles.label, { transform: [{ translateX }] }]}>
          <TextInput ref={this.label} />
        </Animated.View>
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{ width: lineLength * 2 }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    height,
    width,
  },
  cursor: {
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderColor: '#367be2',
    borderWidth: 3,
    backgroundColor: 'white',
  },
  label: {
    position: 'absolute',
    top: -45,
    left: 0,
    backgroundColor: 'lightgray',
    width: labelWidth,
  },
});
