// @flow
import * as React from 'react';
import { View, Dimensions } from 'react-native';

import { type Section } from './Model';
import Header from './Header';

type HeadersProps = {
  sections: Section[],
};

const backgroundColor = '#343761';
const { width, height } = Dimensions.get('window');

export default class Headers extends React.PureComponent<HeadersProps> {
  render() {
    const { sections } = this.props;
    return (
      <View style={{ height, width: sections.length * width, backgroundColor }}>
        {
        sections.map((section, key) => (
          <Header {...{ key, section }} />
        ))
      }
      </View>
    );
  }
}
