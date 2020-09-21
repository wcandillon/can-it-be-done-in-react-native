import React, { useMemo } from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import * as shape from "d3-shape";
import Svg, { Path } from "react-native-svg";
import { scaleLinear } from "d3-scale";

import { Prices, PriceList } from "./Model";
import {parse, interpolatePath, mixPath} from "./Paths";
import { StyleGuide } from "../components";
import Animated, { runOnUI, useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import data from "./data.json";

const SIZE = Dimensions.get("window").width;
const AnimatedPath = Animated.createAnimatedComponent(Path);

const prices = data.data.prices as Prices;

const buildGraph = (priceList: PriceList) => {
  const values = priceList.map((price) => [parseFloat(price[0]), price[1]] as [number, number]);
  const prices = values.map((value) => value[0]);
  const dates = values.map((value) => value[1]);
  const scaleX = scaleLinear().domain([Math.min(...dates), Math.max(...dates)]).range([0, SIZE]);
  const scaleY = scaleLinear().domain( [Math.min(...prices), Math.max(...prices)]).range([SIZE, 0]);
  return shape
    .line()
    .x(([, x]) => scaleX(x))
    .y(([y]) => scaleY(y))
    .curve(shape.curveBasis)(values) as string;
};

const graphs = [
  {
    label: "1H",
    value: 0,
    graph: parse(buildGraph(prices.hour.prices.slice(0, 60)))
  },
  {
    label: "1D",
    value: 1,
    graph: parse(buildGraph(prices.day.prices.slice(0, 60)))
  },
  {
    label: "1M",
    value: 2,
    graph: parse(buildGraph(prices.month.prices.slice(0, 60)))
  },
  {
    label: "1Y",
    value: 3,
    graph: parse(buildGraph(prices.year.prices.slice(0, 60)))
  },
  {
    label: "all",
    value: 4,
    graph: parse(buildGraph(prices.all.prices.slice(0, 60)))
  }
];


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  selection: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  labelContainer: {
    padding: 16
  },
  label: {
    fontSize: 16,
    color: StyleGuide.palette.primary
  }
});

const Graph = () => {
  const transition = useSharedValue(0);
  const previous = useSharedValue(graphs[0].graph);
  const current = useSharedValue(graphs[1].graph);
  const animatedProps = useAnimatedProps(() => {
    return {
      d: interpolatePath(transition.value, [0, 1], [previous.value, current.value])
    };
  });
  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        <AnimatedPath animatedProps={animatedProps} fill="transparent" stroke={StyleGuide.palette.primary} strokeWidth={2} />
      </Svg>
      <View style={styles.selection}>
        { 
          graphs.map(graph => (
            <TouchableWithoutFeedback key={graph.label} onPress={() => {
                previous.value = current.value;
                transition.value = 0;
                current.value = graph.graph;
                transition.value = withTiming(1);
            }}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>{graph.label}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </View>
    </View>
  );
};

export default Graph;
