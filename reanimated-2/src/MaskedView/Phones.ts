import { Dimensions } from "react-native";

export const { width: SIZE } = Dimensions.get("window");

export type PhoneModel = typeof phones[0];
export const phones = [
  {
    id: "red",
    name: "Sunset Red",
    picture: require("./assets/red.png"),
    translate: { x: 0, y: 0 },
    color: "#E86B6A",
  },
  {
    id: "orange",
    name: "Sunrise Orange",
    picture: require("./assets/orange.png"),
    translate: { x: SIZE / 2, y: 0 },
    color: "#FE9968",
  },
  {
    id: "yellow",
    name: "Mellow Yellow",
    picture: require("./assets/yellow.png"),
    translate: { x: -SIZE / 2, y: 0 },
    color: "#FFD386",
  },
  {
    id: "green",
    name: "Seafoam Green",
    picture: require("./assets/green.png"),
    translate: { x: 0, y: SIZE / 2 },
    color: "#6DE4B2",
  },
  {
    id: "blue",
    name: "Sky Blue",
    picture: require("./assets/blue.png"),
    translate: { x: 0, y: -SIZE / 2 },
    color: "#7FE0EB",
  },
  {
    id: "purple",
    name: "Kind of Purple",
    picture: require("./assets/purple.png"),
    translate: { x: 0, y: 0 },
    color: "#98A2DF",
  },
  {
    id: "pink",
    name: "Off Pink",
    picture: require("./assets/pink.png"),
    translate: { x: SIZE / 2, y: SIZE / 2 },
    color: "#EBB9D2",
  },
  {
    id: "black",
    name: "Pastel Black",
    picture: require("./assets/black.png"),
    translate: { x: -SIZE / 2, y: -SIZE / 2 },
    color: "#D6D9D2",
  },
];
