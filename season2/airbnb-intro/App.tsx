import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLoading, Font } from "expo";

import { downloadImagesAsync } from "./components/Images";
import Home from "./components/Home";
import Tabbar from "./components/Tabbar";
import Intro from "./components/Intro";

interface AppProps {}
interface AppState {
  ready: boolean;
}

const steps = [{
  x: 0,
  y: 0,
  label: "Explore your favorite cities.",
}, {
  x: 50,
  y: 100,
  label: "Text",
},
{
  x: 50,
  y: 200,
  label: "Hello",
}];

export default class App extends React.Component<AppProps, AppState> {
  state = {
    ready: false,
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

  render() {
    const { ready } = this.state;
    if (!ready) {
      return (
        <AppLoading />
      );
    }
    return (
      <View style={styles.container}>
        <Home />
        <Tabbar />
        <Intro {...{ steps }} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
