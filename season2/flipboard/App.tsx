/* eslint-disable global-require */
import React from "react";
import {
  Image, StatusBar, View, StyleSheet,
} from "react-native";
import { ImageManipulator, Asset, AppLoading } from "expo";

import Story from "./components/Story";
import BackgroundImage from "./components/BackgroundImage";

interface Size {
  width: number;
  height: number;
}

const getSize = (uri: string): Promise<Size> => new Promise(
  (resolve, reject) => Image.getSize(uri, (width, height) => resolve({ width, height }), reject),
);
const screens = [
  require("./assets/stories/story1.png"),
  require("./assets/stories/story2.png"),
  require("./assets/stories/story3.png"),
  require("./assets/stories/story4.png"),
  require("./assets/stories/story1.png"),
  require("./assets/stories/story2.png"),
];


interface IAppProps {}
interface IAppState {
  stories: { top: string, bottom: string }[];
  index: number;
}

export default class App extends React.Component<IAppProps, IAppState> {
  state: IAppState = {
    stories: [],
    index: 1,
  };

  async componentDidMount() {
    const edits = screens.map(async (screen) => {
      const image = Asset.fromModule(screen);
      await image.downloadAsync();
      const { localUri } = image;
      const { width, height } = await getSize(localUri);
      const crop1 = {
        crop: {
          originX: 0,
          originY: 0,
          width,
          height: height / 2,
        },
      };
      const crop2 = {
        crop: {
          originX: 0,
          originY: height / 2,
          width,
          height: height / 2,
        },
      };
      const { uri: top } = await ImageManipulator.manipulateAsync(localUri, [crop1]);
      const { uri: bottom } = await ImageManipulator.manipulateAsync(localUri, [crop2]);
      return { top, bottom };
    });
    const stories = await Promise.all(edits);
    this.setState({ stories });
  }

  onSnap = (index: number) => {
    const { index: currentIndex } = this.state;
    this.setState({ index: currentIndex + index });
  }

  render() {
    const { onSnap } = this;
    const { stories, index } = this.state;
    if (stories.length === 0) {
      return (
        <AppLoading />
      );
    }
    const prev = stories[index - 1];
    const current = stories[index];
    const next = stories[index + 1];
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <BackgroundImage
          top={!prev ? current.top : prev.top}
          bottom={!next ? current.bottom : next.bottom}
        />
        {
          !prev ? (<View style={styles.container} />) : (
            <Story
              key={`${index}-top`}
              front={current.top}
              back={prev.bottom}
              {...{ onSnap }}
            />
          )
        }
        {
          !next ? (<View style={styles.container} />) : (
            <Story
              key={`${index}-bottom`}
              front={current.bottom}
              back={next.top}
              bottom
              {...{ onSnap }}
            />
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