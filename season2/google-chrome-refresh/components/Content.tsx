import * as React from "react";
import {
  View, Image, Text, Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

interface ContentProps {}

export default class Content extends React.PureComponent<ContentProps> {
  render() {
    return (
      <View>
        <Image source={require("../assets/image.jpg")} style={styles.image} />
        <Text style={styles.title2}>React Native 0.59 is now out with React Hooks, updated JavaScriptCore, and more!</Text>
        <Text>
        After releasing the RC0 version of React Native 0.59, the team announced its stable release yesterday. This release comes with some of the most awaited features including React Hooks, updated JavaScriptCore, and more.
        </Text>
        <Text style={styles.title2}>Support for React Hooks</Text>
        <Text>
        React Hooks were introduced to solve a wide variety of problems in React. It enables you to reuse stateful logic across components without having to restructure your components hierarchy. With React Hooks, you can split a component into smaller functions, based on what pieces are related rather than forcing a split based on lifecycle methods. It also lets you use more of React’s features without classes.
        </Text>
      </View>
    );
  }
}

const styles = {
  image: {
    width,
    height: 150,
    resizeMode: "cover",
  },
  title1: {

  },
  title2: {

  },
  text: {

  },
};
