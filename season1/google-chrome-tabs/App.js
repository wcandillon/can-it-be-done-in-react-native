import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, MaskedViewIOS, ScrollView, Animated} from 'react-native';

import {TabBar, TABBAR_HEIGHT, TABBAR_WIDTH, TAB_WIDTH} from "./src/components";

export default class App extends React.Component  {

  state = {
    x: new Animated.Value(0)
  };

  render() {
    const {x} = this.state;
    const translateX = x.interpolate({
      inputRange: [0, TABBAR_WIDTH],
      outputRange: [TABBAR_WIDTH - TAB_WIDTH, 0]
    });
    return (
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <TabBar color="#f8f9fa" backgroundColor="#828384" borderColor="#505152" />
          <MaskedViewIOS
            style={StyleSheet.absoluteFill}
            maskElement={<Animated.View style={[styles.activeTab, { transform: [{ translateX }] } ]} />}
          >
            <TabBar color="#3b4043" backgroundColor="#f8f9fa" borderColor="#f8f9fa" />
          </MaskedViewIOS>
          <Animated.ScrollView
            style={StyleSheet.absoluteFill}
            contentContainerStyle={{ width: TABBAR_WIDTH * 2 }}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event([ {nativeEvent: {contentOffset: { x }}}], { useNativeDriver: true })}
            bounces={false}
            snapToInterval={TAB_WIDTH + TAB_WIDTH / 2}
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
    alignItems: "center",
    backgroundColor: "#212223"
  },
  activeTab: {
    backgroundColor: "black",
    width: TAB_WIDTH,
    height: TABBAR_HEIGHT
  },
  container: {
    width: TABBAR_WIDTH,
    height: TABBAR_HEIGHT
  }
});
