// @flow
import * as _ from "lodash";
import * as React from "react";
import {
  View, Animated, StyleSheet, TextInput, InteractionManager, Dimensions,
} from "react-native";
import { scaleLinear } from "d3-scale";

import Scale, { ROW_HEIGHT } from "./Scale";

const { height } = Dimensions.get("window");
const backgroundColor = "#409aee";

type WeightTargetProps = {
  weight: number,
  height: number,
};

type WeightTargetState = {
    x: Animated.Value,
};

export default class WeightTarget extends React.PureComponent<WeightTargetProps, WeightTargetState> {
    scroll = React.createRef();

    input = React.createRef();

    listener: () => void;

    state = {
      y: new Animated.Value(0),
    };

    update = ({ value }) => {
      console.log({ value });
    }

    componentDidMount() {
      const { weight, height: h } = this.props;
      const { y } = this.state;
      const BMI = _.round(weight / (h * h));

      // this.scaleBMI = scaleLinear().domain([range * ROW_HEIGHT, 0]).range([from, to]);
      // this.scaleWeight = scaleLinear().domain([from, to]).range([55, 115]);
      this.listener = y.addListener(this.update);
      // InteractionManager.runAfterInteractions(this.scrollToDefaultValue);
    }

    scrollToDefaultValue = () => {
      this.update({ value: 10 * ROW_HEIGHT });
    }

    componentWillUnmount() {
      const { y } = this.state;
      y.removeListener(this.listener);
    }

    render() {
      const { weight, height: h } = this.props;
      const { y } = this.state;
      const BMI = _.round(weight / (h * h));
      const inputRange = [0, 21 * ROW_HEIGHT - height];
      const translateY = y.interpolate({
        inputRange,
        outputRange: [-height / 2 + 100, height / 2 - 100],
      });
      const translateY2 = y.interpolate({
        inputRange,
        outputRange: [height / 2 - 100, -height / 2 + 100],
      });
      return (
        <View style={styles.container}>
          <Animated.ScrollView
            ref={this.scroll}
            style={StyleSheet.absoluteFillObject}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y } } }],
              { useNativeDriver: true },
            )}
          >
            <Scale from={BMI - 10} to={BMI + 10} />
          </Animated.ScrollView>
          <View style={styles.cursorContainer} pointerEvents="none">
            <View style={styles.cursor}>
              <TextInput ref={this.input} style={styles.cursorLabel} />
            </View>
          </View>
          <View style={styles.cursorContainer} pointerEvents="none">
            <Animated.View style={[styles.cursor, { transform: [{ translateY }] }]}>
              <TextInput ref={this.input} style={styles.cursorLabel} />
            </Animated.View>
          </View>
          <View style={styles.cursorContainer} pointerEvents="none">
            <Animated.View style={[styles.cursor, { transform: [{ translateY: translateY2 }] }]} />
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
  cursorContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  cursor: {
    borderRadius: 50,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  cursorLabel: {
    color: "white",
    fontSize: 26,
  },
});
