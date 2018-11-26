// @flow
import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import { type Section } from './Model';
import MockEntry from './MockEntry';
import MockCard from './MockCard';

const { Value } = Animated;
const { height, width } = Dimensions.get('window');

type ContentProps = {
  y: Value,
  sections: Section[],
};

export default class Content extends React.PureComponent<ContentProps> {
  render() {
    const { sections } = this.props;
    return (
      <Animated.View style={styles.container}>
        {
          sections.map(({ image }, key) => (
            <View style={styles.section} {...{ key }}>
              <MockEntry {...{ image }} />
              <MockCard {...{ image }} />
              <MockEntry {...{ image }} />
              <MockEntry {...{ image }} />
              <MockEntry {...{ image }} />
              <MockEntry {...{ image }} />
            </View>
          ))
        }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    minHeight: height,
  },
  section: {
    width,
  },
});
