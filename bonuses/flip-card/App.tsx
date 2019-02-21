import React from "react";
import {
  View, StyleSheet, Dimensions, ImageSourcePropType,
} from "react-native";
import { Asset, AppLoading, DangerZone } from "expo";

import Card from "./components/Card";

const { Animated } = DangerZone;
const { Value, call } = Animated;
const { width } = Dimensions.get("window");

interface AppState {
  card?: {
    front: ImageSourcePropType;
    back: ImageSourcePropType;
  }
}

export default class App extends React.Component<{}, AppState> {
  x = new Value(0);

  state: AppState = {
    card: null,
  };

  async componentDidMount() {
    const front = require("./assets/front.png");
    const back = require("./assets/back.png");
    await Promise.all([
      Asset.loadAsync(front),
      Asset.loadAsync(back),
    ]);
    this.setState({ card: { front, back } });
  }

  render() {
    const { x } = this;
    const { card } = this.state;
    if (!card) {
      return (<AppLoading />);
    }
    return (
      <View style={styles.container}>
        <Card front={card.front} back={card.back} {...{ x }} />
        <Animated.ScrollView
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: width * 2 }}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x },
                },
              },
            ],
          )}
          horizontal
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
