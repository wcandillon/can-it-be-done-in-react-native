import React from "react";
import { ScrollView, SafeAreaView } from "react-native";

import { AppLoading, Asset } from "expo";
import App, { Apps, Position } from "./components/App";

const apps: Apps = [
  {
    id: "yoga",
    title: "Namaste",
    subtitle: "Best Yoga apps for the summer",
    source: require("./assets/images/yoga.jpg"),
    content: "",
  },
  {
    id: "fitness",
    title: "Get Fit",
    subtitle: "Wear it while you work out",
    source: require("./assets/images/fitness.jpg"),
    content: "",
  },
  {
    id: "games",
    title: "Classic Games",
    subtitle: "They never get old",
    source: require("./assets/images/chess.jpg"),
    content: "",
  },
];

interface AppProps {}
interface AppState {
  ready: boolean;
}

export default class extends React.PureComponent<AppProps, AppState> {
  state = {
    ready: false,
  };

  async componentDidMount() {
    await Promise.all(apps.map(app => Asset.loadAsync(app.source)));
    this.setState({ ready: true });
  }

  startTransition = (app: App, position: Position) => console.log({ app, position })

  render() {
    const { startTransition } = this;
    const { ready } = this.state;
    if (!ready) {
      return (
        <AppLoading />
      );
    }
    return (
      <>
        <SafeAreaView />
        <ScrollView>
          {
            apps.map(app => (
              <App key={app.id} {...{ app, startTransition }} />
            ))
          }
        </ScrollView>
      </>
    );
  }
}
