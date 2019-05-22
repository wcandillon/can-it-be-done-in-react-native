// @flow
import * as _ from 'lodash';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Svg } from 'expo';
import { Ionicons as Icon } from '@expo/vector-icons';
import { interpolatePath } from 'd3-interpolate-path';
import SVGPath from 'art/modes/svg/path';

const { Path } = Svg;
const width = 125;
const height = 125;
const radius = width / 2;
const padding = 30;

const randomRadius = () => _.round(_.random(radius - 5, radius));
const generatePath = () => {
  const r = randomRadius();
  return SVGPath()
    .moveTo(padding, r + padding)
    .arc(randomRadius(), -randomRadius(), randomRadius())
    .arc(randomRadius(), randomRadius(), randomRadius())
    .arc(-randomRadius(), randomRadius(), randomRadius())
    .arcTo(padding, r + padding, r)
    .toSVG();
};

const p1 = generatePath();
const paths = [
  p1,
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
];

type ProgressProps = {};
type ProgressState = {
  d: string,
};

export default class Progress extends React.Component<ProgressProps, ProgressState> {
  interval;

  interpolator = interpolatePath(paths[0], paths[1]);

  lastIndex = 1;

  progress = 0;

  state = {
    d: paths[0],
  };

  componentDidMount() {
    this.interval = setInterval(this.animate, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  animate = () => {
    requestAnimationFrame(() => {
      this.progress += 0.1;
      if (this.progress >= 1) {
        this.progress = 0;
        const nextIndex = (this.lastIndex + 1) % paths.length
        this.interpolator = interpolatePath(paths[this.lastIndex], paths[nextIndex]);
        this.lastIndex = nextIndex;
      }
      const d = this.interpolator(this.progress);
      this.setState({ d });
    });
  }

  render(): React.Node {
    const { d } = this.state;
    return (
      <View style={styles.container}>
        <Svg {...{ width: width + padding * 2, height: height + padding * 2 }}>
          <Path fill="#71758e" {...{ d }} stroke="rgba(113, 117, 142, 0.5)" strokeWidth={padding} />
        </Svg>
        <View style={styles.buttonContainer}>
          <Icon name="ios-pause" color="#fbe3b9" size={54} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width + padding * 2,
    height: height + padding * 2,
  },
  buttonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
