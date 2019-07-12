/* eslint-disable global-require */
import React from "react";

import Channels from "./components/Channels";
import LoadAssets from "./components/LoadAssets";
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
    id: "top-gear",
    title: "Top Gear",
    subtitle: "New team, new cars, new adventures",
    type: "Entertainment",
    cover: require("./assets/covers/top-gear.jpg")
  },
  {
    id: "athlete-dispute",
    title: "The Trans Women Athlete Dispute",
    subtitle: "with Martina Navratilova",
    type: "Documentary",
    cover: require("./assets/covers/athlete-dispute.jpg")
  },
  {
    id: "hot-property",
    title: "Hot Property",
    subtitle: "Can meeting mates ensure a dream date?",
    type: "Entertainment",
    cover: require("./assets/covers/hot-property.jpg")
  },
  {
    id: "pose",
    title: "Pose",
    subtitle: "A glam, groundbreaking trip to 80s New York",
    type: "Drama",
    cover: require("./assets/covers/pose.jpg")
  },
  {
    id: "the-planets",
    title: "The Planets",
    subtitle: "The incredible story of our solar system",
    type: "Science & Nature",
    cover: require("./assets/covers/the-planets.jpg")
  },
  {
    id: "hometown",
    title: "Hometown",
    subtitle: "Mobeen Azhar faces some ugly truths",
    type: "Documentary",
    cover: require("./assets/covers/hometown.jpg")
  },
  {
    id: "luther",
    title: "Luther",
    subtitle: "The detective who can't let go of his past",
    type: "Crime Drama",
    cover: require("./assets/covers/luther.jpg")
  },
  {
    id: "line-of-duty",
    title: "Line of Duty",
    subtitle: "Crime needs an inside man",
    type: "Crime Drama",
    cover: require("./assets/covers/line-of-duty.jpg")
  },
  {
    id: "fleabag",
    title: "Fleabag",
    subtitle: "She's smutty, angry, and talking to you",
    type: "Comedy",
    cover: require("./assets/covers/fleabag.jpg")
  },
  {
    id: "death-in-paradise",
    title: "Death in Paradise",
    subtitle: "DI Mooney takes on his first case in Saint Marie",
    type: "Crime Drama",
    cover: require("./assets/covers/death-in-paradise.jpg")
  },
  {
    id: "worldcup",
    title: "FIFA Women's World Cup",
    subtitle: "2019 Highlights: day 18",
    type: "Sport",
    cover: require("./assets/covers/worldcup.jpg")
  },
  {
    id: "legends",
    title: "Legends",
    subtitle: "Serena Williams",
    type: "Sport",
    cover: require("./assets/covers/legends.jpg")
  }
];

export default () => (
  <LoadAssets assets={channels.map(channel => channel.cover)}>
    <Channels {...{ channels }} />
  </LoadAssets>
);
