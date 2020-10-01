import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import * as shape from "d3-shape";
import Svg, { Path } from "react-native-svg";
import { scaleLinear } from "d3-scale";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { parse, mixPath, useVector } from "react-native-redash";

import { Prices, PriceList, SIZE } from "./Model";
import Header from "./Header";
import Cursor from "./Cursor";
import data from "./data.json";

const { width } = Dimensions.get("window");
const AnimatedPath = Animated.createAnimatedComponent(Path);

const values = data.data.prices as Prices;

const buildGraph = (priceList: PriceList) => {
  const formattedValues = priceList.map(
    (price) => [parseFloat(price[0]), price[1]] as [number, number]
  );
  const prices = formattedValues.map((value) => value[0]);
  const dates = formattedValues.map((value) => value[1]);
  const scaleX = scaleLinear()
    .domain([Math.min(...dates), Math.max(...dates)])
    .range([0, SIZE]);
  const scaleY = scaleLinear()
    .domain([Math.min(...prices), Math.max(...prices)])
    .range([SIZE, 0]);
  return shape
    .line()
    .x(([, x]) => scaleX(x))
    .y(([y]) => scaleY(y))
    .curve(shape.curveBasis)(formattedValues) as string;
};

const POINTS = 60;
const graphs = [
  {
    label: "1H",
    value: 0,
    path: parse(buildGraph(values.hour.prices.slice(0, POINTS))),
  },
  {
    label: "1D",
    value: 1,
    path: parse(buildGraph(values.day.prices.slice(0, POINTS))),
  },
  {
    label: "1M",
    value: 2,
    path: parse(buildGraph(values.month.prices.slice(0, POINTS))),
  },
  {
    label: "1Y",
    value: 3,
    path: parse(buildGraph(values.year.prices.slice(0, POINTS))),
  },
  {
    label: "all",
    value: 4,
    path: parse(buildGraph(values.all.prices.slice(0, POINTS))),
  },
];

const SELECTION_WIDTH = width - 32;
const BUTTON_WIDTH = (width - 32) / graphs.length;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundSelection: {
    backgroundColor: "#f3f3f3",
    ...StyleSheet.absoluteFillObject,
    width: BUTTON_WIDTH,
    borderRadius: 8,
  },
  selection: {
    flexDirection: "row",
    width: SELECTION_WIDTH,
    alignSelf: "center",
  },
  labelContainer: {
    padding: 16,
    width: BUTTON_WIDTH,
  },
  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const Graph = () => {
  const translation = useVector();
  const transition = useSharedValue(0);
  const selected = useSharedValue(0);
  const previous = useSharedValue(graphs[0].path);
  const current = useSharedValue(graphs[0].path);
  const animatedProps = useAnimatedProps(() => {
    return {
      d: mixPath(transition.value, previous.value, current.value),
    };
  });
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(BUTTON_WIDTH * selected.value) }],
  }));
  return (
    <View style={styles.container}>
      <Header translation={translation} />
      <View>
        <Svg width={SIZE} height={SIZE}>
          <AnimatedPath
            animatedProps={animatedProps}
            fill="transparent"
            stroke="black"
            strokeWidth={3}
          />
        </Svg>
        <Cursor translation={translation} path={current} />
      </View>
      <View style={styles.selection}>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.backgroundSelection, style]} />
        </View>
        {graphs.map((graph) => {
          return (
            <TouchableWithoutFeedback
              key={graph.label}
              onPress={() => {
                previous.value = current.value;
                transition.value = 0;
                current.value = graph.path;
                transition.value = withTiming(1);
                selected.value = graph.value;
              }}
            >
              <Animated.View style={[styles.labelContainer]}>
                <Text style={styles.label}>{graph.label}</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

export default Graph;
