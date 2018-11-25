// @flow
import * as React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import Headers from './Headers';

const { event, Value } = Animated;

type SectionsProps = {
  sections: Section[],
};

export default class Sections extends React.PureComponent<SectionsProps> {
  render() {
    const { sections } = this.props;
    return (
      <View style={styles.container}>
        <Headers {...{ sections }} />
      </View>
    );
  }
}

/*
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={event(
            [
              {
                nativeEvent: {
                  contentOffset: { y },
                },
              },
            ],
            { useNativeDriver: true },
          )}
        />
        */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
