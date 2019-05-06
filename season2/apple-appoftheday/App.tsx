import React from "react";
import { ScrollView, SafeAreaView, StatusBar } from "react-native";
import { AppLoading, Asset } from "expo";

import { Apps, Position } from "./components/Model";
import App from "./components/App";
import AppModal, { AppModalProps } from "./components/AppModal";

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
  modal: AppModalProps | null
}

export default class extends React.PureComponent<AppProps, AppState> {
  state = {
    ready: false,
    modal: null,
  };

  async componentDidMount() {
    await Promise.all(apps.map(app => Asset.loadAsync(app.source)));
    this.setState({ ready: true });
  }

  open = (app: App, position: Position) => this.setState({ modal: { app, position } });

  close = () => this.setState({ modal: null });

  render() {
    const { open, close } = this;
    const { ready, modal } = this.state;
    if (!ready) {
      return (
        <AppLoading />
      );
    }
    return (
      <>
        <StatusBar
          barStyle="dark-content"
        />
        <SafeAreaView />
        <ScrollView>
          {
            apps.map(app => (
              <App
                key={app.id}
                isInBackground={modal !== null && modal.app.id === app.id}
                {...{ app, open }}
              />
            ))
          }
        </ScrollView>
        {
          modal !== null && (
            <AppModal {...modal} {...{ close }} />
          )
        }
      </>
    );
  }
}
