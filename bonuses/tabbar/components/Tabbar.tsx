import * as React from "react";
import {
  SafeAreaView, StyleSheet, Dimensions, View, Animated,
} from "react-native";
import * as shape from "d3-shape";
import { interpolatePath } from "d3-interpolate-path";
import { Svg } from "expo";

import StaticTabbar from "./StaticTabbar";

const { width } = Dimensions.get("window");
const height = 64;
const { Path } = Svg;
const tabs = [
  {
    name: "grid",
  },
  {
    name: "list",
  },
  {
    name: "repeat",
  },
  {
    name: "map",
  },
  {
    name: "user",
  },
];
const tabWidth = width / tabs.length;
const backgroundColor = "white";

const getPath = (index: number): string => {
  const start = index * tabWidth;
  const end = start + tabWidth;
  const left = shape.line().x(d => d.x).y(d => d.y)([
    { x: 0, y: 0 },
    { x: start, y: 0 },
  ]);
  // .curve(shape.curveMonotoneX)
  const tab = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([
    { x: start, y: 0 },
    { x: start + 5, y: 0 },
    { x: start + 10, y: 10 },
    { x: start + 15, y: height },
    { x: end - 15, y: height },
    { x: end - 10, y: 10 },
    { x: end - 5, y: 0 },
    { x: end, y: 0 },
  ]);
  const right = shape.line().x(d => d.x).y(d => d.y)([
    { x: end, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
  ]);
  return `${left} ${tab} ${right}`;
};

const paths = tabs.map((tab, index) => getPath(index));

interface TabbarProps {}
interface TabbarState {
  index: number;
}

// eslint-disable-next-line react/prefer-stateless-function
export default class Tabbar extends React.PureComponent<TabbarProps, TabbarState> {
  value = new Animated.Value(0);

  path = React.createRef<typeof Path>();

  interpolator = interpolatePath(paths[0], paths[1]);

  subscription = "";

  state = {
    index: 0,
  };

  componentDidMount() {
    this.subscription = this.value.addListener(this.updatePath);
  }

  componentWillUnmount() {
    this.value.removeListener(this.subscription);
  }

  updatePath = ({ value }: { value: number}) => {
    const d = this.interpolator(value);
    if (this.path.current) {
      this.path.current.setNativeProps({ d });
    }
  }

  onChange = (prev: number, index: number) => {
    const { value } = this;
    this.setState({ index });
    this.interpolator = interpolatePath(paths[prev], paths[index]);
    value.setValue(0);
    Animated.timing(value, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { onChange, value } = this;
    const { index } = this.state;
    const d = paths[index];
    return (
      <>
        <View {...{ width, height }}>
          <Svg {...{ width, height }}>
            <Path ref={this.path} fill={backgroundColor} {...{ d }} />
          </Svg>
          <View style={StyleSheet.absoluteFill}>
            <StaticTabbar {...{ tabs, index, onChange }} />
          </View>
        </View>
        <SafeAreaView style={styles.container} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor,
  },
});
