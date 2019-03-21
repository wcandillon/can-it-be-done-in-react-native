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
        <View style={styles.content}>
          <Text style={styles.title2}>React Native 0.59 is now out with React Hooks, updated JavaScriptCore, and more!</Text>
          <Text style={styles.text}>
        After releasing the RC0 version of React Native 0.59, the team announced its stable release yesterday. This release comes with some of the most awaited features including React Hooks, updated JavaScriptCore, and more.
          </Text>
          <Text style={styles.title2}>Support for React Hooks</Text>
          <Text style={styles.text}>
        React Hooks were introduced to solve a wide variety of problems in React. It enables you to reuse stateful logic across components without having to restructure your components hierarchy. With React Hooks, you can split a component into smaller functions, based on what pieces are related rather than forcing a split based on lifecycle methods. It also lets you use more of React’s features without classes.
          </Text>
          <Text style={styles.title2}>Updated JavaScriptCore</Text>
          <Text style={styles.text}>
          The JavaScriptCore (JSC) is an engine that allows Android developers to use JavaScript natively in their apps. React Native 0.59 comes with an updated JSC for Android, and hence supports a lot of modern JavaScript features. These features include 64-bit support, JavaScript support, and big performance improvements.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  content: {
    padding: 8,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  title1: {
    fontSize: 34,
    lineHeight: 41,
    marginBottom: 16,
  },
  title2: {
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 16,
  },
  text: {
    fontSize: 17,
    lineHeight: 20,
    marginBottom: 8,
  },
};
