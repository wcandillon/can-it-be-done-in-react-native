import React from "react";
import {
  StyleSheet, View, ScrollView, Text,
} from "react-native";
import { AppLoading, Font } from "expo";

import { downloadImagesAsync } from "./components/Images";
import Home from "./components/Home";
import Tabbar from "./components/Tabbar";
import Intro from "./components/Intro";

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface Step {
  x: number;
  y: number;
  label: string;
}
interface AppProps {}
interface AppState {
  ready: boolean;
  steps: Step[] | null;
}

const measure = async (ref: View | Text | ScrollView): Promise<Position> => new Promise(resolve => ref.measureInWindow((x, y, width, height) => resolve({
  x, y, width, height,
})));

export default class App extends React.Component<AppProps, AppState> {
  home = React.createRef();

  state = {
    ready: false,
    steps: null,
  };

  async componentDidMount() {
    await Promise.all([downloadImagesAsync(), this.downloadFontsAsync()]);
    this.setState({ ready: true });
  }

  downloadFontsAsync = () => Font.loadAsync({
    "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
    "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
    "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "SFProDisplay-Light": require("./assets/fonts/SF-Pro-Display-Light.otf"),
  });

  measure = async () => {
    const explore = measure(this.home.current.explore.current);
    const city = measure(this.home.current.city.current);
    const cities = measure(this.home.current.cities.current);
    const measures = await Promise.all([explore, city, cities]);
    const steps = [{
      x: measures[0].x,
      y: measures[0].y,
      label: "Explore what the app has to offer. Choose between homes, experiences, restaurants, and more.",
    }, {
      x: measures[1].x,
      y: measures[1].y,
      label: "Find the best accomodation in your favorite city.",
    },
    {
      x: measures[2].x,
      y: measures[2].y,
      label: "Explore the most popular cities.",
    }];
    this.setState({ steps });
  };

  render() {
    const { ready, steps } = this.state;
    if (!ready) {
      return (
        <AppLoading />
      );
    }
    return (
      <View style={styles.container}>
        <Home ref={this.home} onLoad={this.measure} />
        <Tabbar />
        {
          steps && (
            <Intro {...{ steps }} />
          )
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
