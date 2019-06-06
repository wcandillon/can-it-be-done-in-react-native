/* eslint-disable global-require */
import _ from "lodash";
import React, { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";

import CardSelection from "./components/CardSelection";
import { Card as CardModel } from "./components/Card";

const usePromiseAll = <T extends any>(promises: Promise<T>[], cb: () => void) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

const cards: [CardModel, CardModel, CardModel] = [
  {
    id: "purple-sky",
    name: "Purple Sky",
    design: require("./assets/cards/purple-sky.png"),
    thumbnail: require("./assets/cards/purple-sky-thumbnail.png"),
    color: "#ec10db"
  },
  {
    id: "summer-sunset",
    name: "Summer Sunset",
    design: require("./assets/cards/summer-sunset.png"),
    thumbnail: require("./assets/cards/summer-sunset-thumbnail.png"),
    color: "#a373de"
  },
  {
    id: "meteor-shower",
    name: "Meteor shower",
    design: require("./assets/cards/meteor-shower.png"),
    thumbnail: require("./assets/cards/meteor-shower-thumbnail.png"),
    color: "#fc6091"
  }
];

export default () => {
  const [ready, setReady] = useState(false);
  const loadAssets = _.flatten(
    cards.map(card => [
      Asset.loadAsync(card.design),
      Asset.loadAsync(card.thumbnail)
    ])
  );
  usePromiseAll(loadAssets, () => setReady(true));
  if (!ready) {
    return <AppLoading />;
  }
  return <CardSelection {...{ cards }} />;
};
