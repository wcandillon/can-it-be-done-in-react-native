// @flow
import * as React from "react";
import {
  View, Animated, StyleSheet, SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo";

import Section from "./Section";

const topColor = "#76f3cb";
const bottomColor = "#409aee";

type WeightTargetProps = {
  defaultValue: number,
};
type WeightTargetState = {
    x: Animated.Value,
};

export default class WeightTarget extends React.PureComponent<WeightTargetProps, WeightTargetState> {
    scroll = React.createRef();

    state = {
      x: new Animated.Value(0),
    };

    render() {
      const { x } = this.state;
      return (
        <View style={styles.container}>
          <View style={styles.topHalf} />
          <View style={styles.bottomHalf} />
          <Animated.ScrollView
            ref={this.scroll}
            style={StyleSheet.absoluteFillObject}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
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
          >
            <LinearGradient colors={[topColor, bottomColor]}>
              <SafeAreaView>
                <Section label="Obese" from={30} to={36} noTopLabel />
                <Section label="Overweight" from={25} to={29} />
                <Section label="Healthy weight" from={19} to={24} />
                <Section label="Underweight" from={17} to={18} noBottomLabel />
              </SafeAreaView>
            </LinearGradient>
          </Animated.ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flex: 0.5,
    backgroundColor: topColor,
  },
  bottomHalf: {
    flex: 0.5,
    backgroundColor: bottomColor,
  },
});
