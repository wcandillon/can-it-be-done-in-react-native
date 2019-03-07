import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import {AppLoading, Font} from "expo";

import {downloadImagesAsync} from "./components/Images";
import Home from "./components/Home";
import Tabbar from "./components/Tabbar";

interface AppProps {}
interface AppState {
  ready: boolean;
}

export default class App extends React.Component<AppProps, AppState> {

  state = {
    ready: false
  };

  async componentDidMount() {
    await Promise.all([downloadImagesAsync(), this.downloadFontsAsync()]);
    this.setState({ ready: true });
  }

  async downloadFontsAsync() {
    await Font.loadAsync({
      "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
      "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
      "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
      "SFProDisplay-Light": require("./assets/fonts/SF-Pro-Display-Light.otf")
  });
  }

  render() {
    const {ready} = this.state;
    if (!ready) {
      return (
        <AppLoading />
      )
    }
    return (
      <SafeAreaView style={styles.container}>
        <Home />
        <Tabbar />
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8"
  }
})