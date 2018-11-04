// @flow
import * as _ from "lodash";
import * as React from "react";
import {
  View, Animated, StyleSheet, TextInput, InteractionManager, Dimensions,
} from "react-native";
import { scaleLinear } from "d3-scale";

import Section, { ROW_HEIGHT } from "./Section";

const { height } = Dimensions.get("window");
const backgroundColor = "#409aee";
const from = 17;
const to = 36;
const range = to - from + 1;
const scaleBMI = scaleLinear().domain([range * ROW_HEIGHT, 0]).range([from, to]);
const scaleWeight = scaleLinear().domain([from, to]).range([55, 115]);

type WeightTargetProps = {
  defaultWeight: number,
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
      const { defaultWeight } = this.props;
      const defaultBMI = _.round(scaleWeight.invert(defaultWeight), 2);
      const scaleProgress = scaleLinear().domain([from, defaultBMI, to]).range([-100, 0, 100]);
      const y = value + height / 2;
      const BMI = scaleBMI(y);
      const progress = scaleProgress(BMI);
      const kgs = _.round(scaleWeight(BMI * 2), 0) / 2;
      const text = `${kgs}`;
      this.input.current.setNativeProps({ text });
    }

    componentDidMount() {
      const { y } = this.state;
      this.listener = y.addListener(this.update);
      InteractionManager.runAfterInteractions(this.scrollToDefaultValue);
    }

    scrollToDefaultValue = () => {
      const { defaultWeight } = this.props;
      const scrollTo = scaleBMI.invert(scaleWeight.invert(defaultWeight)) - height / 2;
      this.scroll.current.getNode().scrollTo({ y: scrollTo });
      this.update({ value: scrollTo });
    }

    componentWillUnmount() {
      const { y } = this.state;
      y.removeListener(this.listener);
    }

    render() {
      const { y } = this.state;
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
            <Section label="Obese" from={30} to={36} noTopLabel />
            <Section label="Overweight" from={25} to={29} />
            <Section label="Healthy weight" from={19} to={24} />
            <Section label="Underweight" from={17} to={18} noBottomLabel />
          </Animated.ScrollView>
          <View style={styles.cursorContainer} pointerEvents="none">
            <View style={styles.cursor}>
              <TextInput ref={this.input} style={styles.cursorLabel} />
            </View>
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
