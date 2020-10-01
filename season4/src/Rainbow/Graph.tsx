import React from "react";
import { Text, View, StyleSheet } from "react-native";
import * as shape from "d3-shape";
import Svg, { Path } from "react-native-svg";
import { scaleLinear } from "d3-scale";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { parse, mixPath } from "react-native-redash";

import { Prices, PriceList, SIZE } from "./Model";
import Cursor from "./Cursor";
import data from "./data.json";

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
    graph: parse(buildGraph(values.hour.prices.slice(0, POINTS))),
  },
  {
    label: "1D",
    value: 1,
    graph: parse(buildGraph(values.day.prices.slice(0, POINTS))),
  },
  {
    label: "1M",
    value: 2,
    graph: parse(buildGraph(values.month.prices.slice(0, POINTS))),
  },
  {
    label: "1Y",
    value: 3,
    graph: parse(buildGraph(values.year.prices.slice(0, POINTS))),
  },
  {
    label: "all",
    value: 4,
    graph: parse(buildGraph(values.all.prices.slice(0, POINTS))),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  selection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  labelContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: "black",
  },
});

const Graph = () => {
  const transition = useSharedValue(0);
  const previous = useSharedValue(graphs[0].graph);
  const current = useSharedValue(graphs[0].graph);
  const animatedProps = useAnimatedProps(() => {
    return {
      d: mixPath(transition.value, previous.value, current.value),
    };
  });
  return (
    <View style={styles.container}>
      <View>
        <Svg width={SIZE} height={SIZE}>
          <AnimatedPath
            animatedProps={animatedProps}
            fill="transparent"
            stroke="black"
            strokeWidth={3}
          />
        </Svg>
        <Cursor path={current} />
      </View>
      <View style={styles.selection}>
        {graphs.map((graph) => (
          <TouchableWithoutFeedback
            key={graph.label}
            onPress={() => {
              previous.value = current.value;
              transition.value = 0;
              current.value = graph.graph;
              transition.value = withTiming(1);
            }}
          >
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{graph.label}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

export default Graph;
