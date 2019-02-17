/* eslint-disable global-require */
import React from "react";
import { Image, StatusBar } from "react-native";
import { ImageManipulator, Asset, AppLoading } from "expo";

import Story, { IStory } from "./components/Story";

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
];


interface IAppProps {}
interface IAppState {
  stories: IStory[];
}

export default class App extends React.Component<IAppProps, IAppState> {
  state = {
    stories: [],
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

  render() {
    const { stories } = this.state;
    if (stories.length === 0) {
      return (
        <AppLoading />
      );
    }
    return (
      <>
        <StatusBar hidden />
        <Story front={stories[0]} back={stories[1]} />
      </>
    );
  }
}
