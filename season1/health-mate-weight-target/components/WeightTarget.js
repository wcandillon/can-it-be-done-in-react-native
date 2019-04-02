// @flow
// Pinch icon: Pinch by Juraj Sedlák from the Noun Project
import * as _ from "lodash";
import * as React from "react";
import {
  View, Animated, StyleSheet, TextInput, InteractionManager, Dimensions, Text, Image,
} from "react-native";
import { scaleLinear } from "d3-scale";

import Scale, { ROW_HEIGHT } from "./Scale";
import Overlays from "./Overlays";
import StartModal from "./StartModal";

const { height } = Dimensions.get("window");
const backgroundColor = "#409aee";
const PADDING = 100;

type WeightTargetProps = {
  weight: number,
  height: number,
};

type WeightTargetState = {
    x: Animated.Value,
    visibleModal: boolean,
};

export default class WeightTarget extends React.PureComponent<WeightTargetProps, WeightTargetState> {
    scroll = React.createRef();

    totalInput = React.createRef();

    relativeInput = React.createRef();

    modalInput = React.createRef();

    line = React.createRef();

    to: number;

    from: number;

    scaleBMI: number => number;

    listener: () => void;

    constructor(props: WeightTargetProps) {
      super(props);
      const { weight, height: h } = this.props;
      const BMI = _.round(weight / (h * h));
      this.from = BMI - 10;
      this.to = BMI + 10;
      this.scaleBMI = scaleLinear().domain([this.to, this.from]).range([0, 21 * ROW_HEIGHT - height]);
      this.state = {
        y: new Animated.Value(this.scaleBMI(BMI)),
        visibleModal: true,
      };
    }

    componentDidMount() {
      const { y } = this.state;
      this.listener = y.addListener(this.update);
      InteractionManager.runAfterInteractions(this.scrollToDefaultValue);
    }

    componentWillUnmount() {
      const { y } = this.state;
      y.removeListener(this.listener);
    }

    scrollToDefaultValue = () => {
      const { weight, height: h } = this.props;
      const BMI = weight / (h * h);
      const y = this.scaleBMI(BMI);
      this.scroll.current.getNode().scrollTo({ y, animated: false });
      this.update({ value: y }, true);
    }

    update = ({ value }, init: boolean) => {
      if (!init) {
        this.setState({ visibleModal: false });
      }
      const { height: h, weight } = this.props;
      const BMI = this.scaleBMI.invert(value);
      const kg = BMI * h * h;
      if (init) {
        this.modalInput.current.setNativeProps({
          text: `${_.round(kg, 1).toFixed(1)}`,
        });
      }
      this.totalInput.current.setNativeProps({
        text: `${(_.round(kg * 2) / 2).toFixed(1)}`,
      });
      this.relativeInput.current.setNativeProps({
        text: `${(_.round((kg - weight) * 2) / 2).toFixed(1)}`,
      });
    }

    render() {
      const { from, to } = this;
      const { y, visibleModal } = this.state;
      const inputRange = [0, 21 * ROW_HEIGHT - height];
      const translateY = y.interpolate({
        inputRange,
        outputRange: [-height / 2 + PADDING, height / 2 - PADDING],
      });
      const translateY2 = y.interpolate({
        inputRange,
        outputRange: [height / 2 - PADDING, -height / 2 + PADDING],
      });
      const scale = y.interpolate({
        inputRange: [inputRange[0], inputRange[1] / 2, inputRange[1]],
        outputRange: [0.5, 1, 0.5],
      });
      const scaleY = y.interpolate({
        inputRange: [inputRange[0], inputRange[1] / 2, inputRange[1]],
        outputRange: [height - PADDING - 50, 50, height - PADDING - 50],
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
            <Scale {...{ from, to }} />
          </Animated.ScrollView>
          <Overlays>
            <Animated.View ref={this.line} style={[styles.line, { transform: [{ scaleY }] }]} />
            <Animated.View style={[styles.oppositeCursor, { transform: [{ translateY: translateY2 }] }]} />
            <Animated.View style={[styles.cursor, { transform: [{ scale }] }]}>
              <TextInput ref={this.relativeInput} underlineColorAndroid="transparent"  style={styles.cursorLabel} />
            </Animated.View>
            <Animated.View style={[styles.mainCursor, { transform: [{ translateY }] }]}>
              <TextInput ref={this.totalInput} underlineColorAndroid="transparent"  style={styles.mainCursorLabel} />
            </Animated.View>
          </Overlays>
          {
            visibleModal && (
              <StartModal>
                <View style={styles.mainCursor}>
                  <TextInput ref={this.modalInput} underlineColorAndroid="transparent"  style={styles.mainCursorLabel} />
                </View>
              </StartModal>
            )
          }
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
  line: {
    height: 1,
    width: 1,
    backgroundColor: "white",
  },
  cursor: {
    borderRadius: 50,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
    backgroundColor,
  },
  mainCursor: {
    borderRadius: 50,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  oppositeCursor: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "white",
  },
  cursorLabel: {
    color: "white",
    fontSize: 26,
  },
  mainCursorLabel: {
    color: backgroundColor,
    fontSize: 26,
  },
});
