import * as React from "react";
import {
  Dimensions, StyleSheet, Animated, TouchableWithoutFeedback, View, Text, SafeAreaView,
} from "react-native";
import { Svg } from "expo";
import SVGPath from "art/modes/svg/path";
import StyleGuide from "./StyleGuide";

const { width, height } = Dimensions.get("window");
const { Path } = Svg;
const radius = 75;
const xc = width * 3 / 2;
const yc = height * 3 / 2;
const overlay = SVGPath()
  .moveTo(0, 0)
  .lineTo(width * 3, 0)
  .lineTo(width * 3, height * 3)
  .lineTo(0, height * 3)
  .lineTo(0, 0)
  .close()

  .moveTo(xc - radius, yc)
  .counterArcTo(xc, yc + radius, radius)
  .counterArcTo(xc + radius, yc, radius)
  .counterArcTo(xc, yc - radius, radius)
  .counterArcTo(xc - radius, yc, radius);

interface Step {
  x: number;
  y: number;
  label: string;
}

interface IntroProps {
  steps: Step[];
}

interface IntroState {
  index: number
}

export default class Intro extends React.PureComponent<IntroProps, IntroState> {
  x = new Animated.Value(0);

  y = new Animated.Value(0);

  state = {
    index: -1,
  };

  componentDidMount() {
    this.nextStep();
  }

  nextStep = () => {
    const { x, y } = this;
    const { steps } = this.props;
    const { index } = this.state;
    if (index + 1 >= steps.length) {
      this.setState({ index: -1 });
    } else {
      this.setState({ index: index + 1 });
      const step = steps[index + 1];
      Animated.parallel([
        Animated.timing(x, {
          toValue: step.x,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(y, {
          toValue: step.y,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }

  render() {
    const { x, y } = this;
    const { steps } = this.props;
    const { index } = this.state;
    const step = steps[index];
    const translateX = Animated.add(x, new Animated.Value(-width / 2 + radius));
    const translateY = Animated.add(y, new Animated.Value(-height / 2 + radius));
    if (index === -1) {
      return null;
    }
    return (
      <>
        <Animated.View
          style={[styles.container, {
            transform: [
              { translateX },
              { translateY },
            ],
          }]}
        >
          <Svg style={StyleSheet.absoluteFill}>
            <Path
              d={overlay.toSVG()}
              fill="#00A699"
              opacity={0.85}
            />
          </Svg>
        </Animated.View>
        <View style={styles.content}>
          <SafeAreaView>
            <Text style={styles.label}>{step.label}</Text>
            <TouchableWithoutFeedback onPress={this.nextStep}>
              <View style={styles.button}>
                <Text style={styles.label}>Next</Text>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -height,
    left: -width,
    width: width * 3,
    height: height * 3,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: StyleGuide.spacing.large,
  },
  button: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    padding: StyleGuide.spacing.tiny,
    marginTop: StyleGuide.spacing.base,
  },
  label: {
    color: "white",
    textAlign: "center",
    ...StyleGuide.typography.title3,
  },
});
