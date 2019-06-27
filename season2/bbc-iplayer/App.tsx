import React from "react";

import Channels from "./components/Channels";
import { Channel } from "./components/Model";

const channels: Channel[] = [
  {
    id: "killing-eve",
    title: "Killing Eve",
    subtitle: "Sorry baby, xoxo",
    type: "Drama",
    cover: require("./assets/covers/killing-eve.jpg")
  },
  {
    id: "atlanta",
    title: "Atlanta",
    subtitle: "Can Earn work his way to success?",
    type: "Comedy",
    cover: require("./assets/covers/atlanta.jpg")
  },
  {
    id: "years-and-years",
    title: "Years and years",
    subtitle: "Can a family survive the future?",
    type: "Drama",
    cover: require("./assets/covers/years-and-years.jpg")
  },
  {
    id: "gentleman-jack",
    title: "Gentleman Jack",
    subtitle: "The true story of a remarkable woman in search of a wife",
    type: "Period Drama",
    cover: require("./assets/covers/gentleman-jack.jpg")
  },
  {
    id: "london-kills",
    title: "London Kills",
    subtitle: "A Met Police murder squad face intense cases",
    type: "Crime Drama",
    cover: require("./assets/covers/london-kills.jpg")
  },
  {
    id: "minding-the-gap",
    title: "Minding the Gap: An American Stakeboarding Story",
    subtitle: "A coming-of-age saga",
    type: "Film",
    cover: require("./assets/covers/minding-the-gap.jpg")
  },
  {
    id: "killing-eve",
    title: "Killing Eve",
    subtitle: "Sorry baby, xoxo",
    type: "Drama",
    cover: require("./assets/covers/killing-eve.jpg")
  },
  {
    id: "killing-eve",
    title: "Killing Eve",
    subtitle: "Sorry baby, xoxo",
    type: "Drama",
    cover: require("./assets/covers/killing-eve.jpg")
  },
  {
    id: "killing-eve",
    title: "Killing Eve",
    subtitle: "Sorry baby, xoxo",
    type: "Drama",
    cover: require("./assets/covers/killing-eve.jpg")
  },
  {
    id: "killing-eve",
    title: "Killing Eve",
    subtitle: "Sorry baby, xoxo",
    type: "Drama",
    cover: require("./assets/covers/killing-eve.jpg")
  },
  {
    id: "killing-eve",
    title: "Killing Eve",
    subtitle: "Sorry baby, xoxo",
    type: "Drama",
    cover: require("./assets/covers/killing-eve.jpg")
  },
  {
    id: "killing-eve",
    title: "Killing Eve",
    subtitle: "Sorry baby, xoxo",
    type: "Drama",
    cover: require("./assets/covers/killing-eve.jpg")
  },
  {
    id: "killing-eve",
    title: "Killing Eve",
    subtitle: "Sorry baby, xoxo",
    type: "Drama",
    cover: require("./assets/covers/killing-eve.jpg")
  },
  {
    id: "killing-eve",
    title: "Killing Eve",
    subtitle: "Sorry baby, xoxo",
    type: "Drama",
    cover: require("./assets/covers/killing-eve.jpg")
  },
  {
    id: "killing-eve",
    title: "Killing Eve",
    subtitle: "Sorry baby, xoxo",
    type: "Drama",
    cover: require("./assets/covers/killing-eve.jpg")
  },
  {
    id: "killing-eve",
    title: "Killing Eve",
    subtitle: "Sorry baby, xoxo",
    type: "Drama",
    cover: require("./assets/covers/killing-eve.jpg")
  },
  {
    id: "killing-eve",
    title: "Killing Eve",
    subtitle: "Sorry baby, xoxo",
    type: "Drama",
    cover: require("./assets/covers/killing-eve.jpg")
  },
  {
    id: "killing-eve",
    title: "Killing Eve",
    subtitle: "Sorry baby, xoxo",
    type: "Drama",
    cover: require("./assets/covers/killing-eve.jpg")
  }
];

export default function App() {
  return <Channels {...{ channels }} />;
}
