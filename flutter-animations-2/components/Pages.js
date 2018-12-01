// @flow
import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { type Section, SMALL_HEADER_HEIGHT } from './Model';
import MockEntry from './MockEntry';
import MockCard from './MockCard';

type PagesProps = {
  sections: Section[],
};

const { height, width } = Dimensions.get('window');

export default class Pages extends React.PureComponent<PagesProps> {
  render() {
    const { sections } = this.props;
    return (
      <View style={styles.container}>
        {
        sections.map(({ image }, key) => (
          <View style={styles.page} {...{ key }}>
            <MockEntry {...{ image }} />
            <MockCard {...{ image }} />
            <MockEntry {...{ image }} />
            <MockEntry {...{ image }} />
            <MockEntry {...{ image }} />
            <MockEntry {...{ image }} />
          </View>
        ))
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  page: {
    width,
    height: height - SMALL_HEADER_HEIGHT,
  },
});
