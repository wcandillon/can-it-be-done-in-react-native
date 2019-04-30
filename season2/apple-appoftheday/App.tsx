import React from "react";
import { ScrollView, SafeAreaView } from "react-native";

import App, { Apps } from "./components/App";

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

export default () => (
  <>
    <SafeAreaView />
    <ScrollView>
      {
        apps.map(app => (
          <App key={app.id} {...{ app }} />
        ))
      }
    </ScrollView>
  </>
);
