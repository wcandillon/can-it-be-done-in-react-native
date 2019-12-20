import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { onScroll, useValues } from "react-native-redash";

import HeaderImage from "./HeaderImage";
import Content, { defaultTabs } from "./Content";
import Header from "./Header";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default () => {
  const scrollView = useRef<Animated.ScrollView>(null);
  const [tabs, setTabs] = useState(defaultTabs);
  const [y] = useValues([0], []);
  return (
    <View style={styles.container}>
      <HeaderImage {...{ y }} />
      <Animated.ScrollView
        ref={scrollView}
        style={StyleSheet.absoluteFill}
        onScroll={onScroll({ y })}
        scrollEventThrottle={1}
      >
        <Content
          onMeasurement={(index, tab) => {
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
          {...{ y }}
        />
      </Animated.ScrollView>
      <Header {...{ y, tabs, scrollView }} />
    </View>
  );
};
