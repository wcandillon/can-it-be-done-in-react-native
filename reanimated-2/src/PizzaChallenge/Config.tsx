import { Dimensions } from "react-native";

export type PizzaChallengeRoutes = {
  Pizzas: undefined;
  Pizza: { id: string };
};

export interface State {
  basil: number;
  sausage: number;
  onion: number;
  broccoli: number;
  mushroom: number;
}

export const defaultState = {
  basil: 0,
  sausage: 0,
  onion: 0,
  broccoli: 0,
  mushroom: 0,
};

const { width } = Dimensions.get("window");
export const PADDING = 32;
export const PIZZA_SIZE = width - PADDING * 2;
export const BREAD_PADDING = PIZZA_SIZE * 0.03;
export const INGREDIENT_SCALE = 0.15;
export const MIN_RADIUS = (PIZZA_SIZE / 2) * 0.3;
export const MAX_RADIUS = (PIZZA_SIZE / 2) * 0.6;

export const assets = {
  plate: require("./assets/Plate.png"),
  pizza: [
    require("./assets/Pizzas/Pizza_1.png"),
    require("./assets/Pizzas/Pizza_2.png"),
    require("./assets/Pizzas/Pizza_3.png"),
    require("./assets/Pizzas/Pizza_4.png"),
    require("./assets/Pizzas/Pizza_5.png"),
  ],
  bread: [
    require("./assets/Bread/Bread_1.png"),
    require("./assets/Bread/Bread_2.png"),
    require("./assets/Bread/Bread_3.png"),
    require("./assets/Bread/Bread_4.png"),
    require("./assets/Bread/Bread_5.png"),
  ],
  basil: [
    require("./assets/Basil/Basil_1.png"),
    require("./assets/Basil/Basil_2.png"),
    require("./assets/Basil/Basil_3.png"),
    require("./assets/Basil/Basil_4.png"),
    require("./assets/Basil/Basil_5.png"),
    require("./assets/Basil/Basil_6.png"),
    require("./assets/Basil/Basil_7.png"),
    require("./assets/Basil/Basil_8.png"),
    require("./assets/Basil/Basil_9.png"),
    require("./assets/Basil/Basil_10.png"),
    require("./assets/Basil/Basil_11.png"),
  ],
  sausage: [
    require("./assets/Sausage/Sausage_1.png"),
    require("./assets/Sausage/Sausage_2.png"),
    require("./assets/Sausage/Sausage_3.png"),
    require("./assets/Sausage/Sausage_4.png"),
    require("./assets/Sausage/Sausage_5.png"),
    require("./assets/Sausage/Sausage_6.png"),
    require("./assets/Sausage/Sausage_7.png"),
    require("./assets/Sausage/Sausage_8.png"),
    require("./assets/Sausage/Sausage_9.png"),
    require("./assets/Sausage/Sausage_10.png"),
    require("./assets/Sausage/Sausage_11.png"),
    require("./assets/Sausage/Sausage_12.png"),
  ],
  onion: [
    require("./assets/Onion/Onion_1.png"),
    require("./assets/Onion/Onion_2.png"),
    require("./assets/Onion/Onion_3.png"),
    require("./assets/Onion/Onion_4.png"),
    require("./assets/Onion/Onion_5.png"),
    require("./assets/Onion/Onion_6.png"),
    require("./assets/Onion/Onion_7.png"),
    require("./assets/Onion/Onion_8.png"),
    require("./assets/Onion/Onion_9.png"),
    require("./assets/Onion/Onion_10.png"),
    require("./assets/Onion/Onion_11.png"),
    require("./assets/Onion/Onion_12.png"),
    require("./assets/Onion/Onion_13.png"),
  ],
  broccoli: [
    require("./assets/Broccoli/Broccoli_1.png"),
    require("./assets/Broccoli/Broccoli_2.png"),
    require("./assets/Broccoli/Broccoli_3.png"),
    require("./assets/Broccoli/Broccoli_4.png"),
    require("./assets/Broccoli/Broccoli_5.png"),
    require("./assets/Broccoli/Broccoli_6.png"),
    require("./assets/Broccoli/Broccoli_7.png"),
    require("./assets/Broccoli/Broccoli_8.png"),
    require("./assets/Broccoli/Broccoli_9.png"),
    require("./assets/Broccoli/Broccoli_10.png"),
    require("./assets/Broccoli/Broccoli_11.png"),
  ],
  mushroom: [
    require("./assets/Mushroom/Mushroom_1.png"),
    require("./assets/Mushroom/Mushroom_2.png"),
    require("./assets/Mushroom/Mushroom_3.png"),
    require("./assets/Mushroom/Mushroom_4.png"),
    require("./assets/Mushroom/Mushroom_5.png"),
    require("./assets/Mushroom/Mushroom_6.png"),
    require("./assets/Mushroom/Mushroom_7.png"),
    require("./assets/Mushroom/Mushroom_8.png"),
    require("./assets/Mushroom/Mushroom_9.png"),
    require("./assets/Mushroom/Mushroom_10.png"),
    require("./assets/Mushroom/Mushroom_11.png"),
    require("./assets/Mushroom/Mushroom_12.png"),
  ],
  extra: [
    require("./assets/Extra/GreenSweetPepper.png"),
    require("./assets/Extra/Pineapple.png"),
  ],
};
