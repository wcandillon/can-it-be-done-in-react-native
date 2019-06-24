import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import CircularSelection from "./CircularSelection";

interface ChannelsProps {
  channels: Channel[];
}

export default ({ channels }: ChannelsProps) => {
  return (
    <View style={styles.container}>
      <CircularSelection {...{channels}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
