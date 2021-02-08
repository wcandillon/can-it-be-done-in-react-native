import { Dimensions } from "react-native";

const {width} = Dimensions.get("window");
export const PIZZA_SIZE = width - 64;
export const BREAD_PADDING = PIZZA_SIZE * 0.03;
export const INGREDIENT_SCALE = 0.15;
export const MIN_RADIUS = PIZZA_SIZE/2 * 0.3;
export const MAX_RADIUS = PIZZA_SIZE/2 * 0.6;


export const assets = {
  plate: require("./assets/Plate.png"),
  bread: [
    require("./assets/Bread/Bread_1.png")
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
    require("./assets/Sausage/Sausage_13.png"),
    require("./assets/Sausage/Sausage_14.png"),
    require("./assets/Sausage/Sausage_15.png"),
    require("./assets/Sausage/Sausage_16.png"),
    require("./assets/Sausage/Sausage_17.png"),
    require("./assets/Sausage/Sausage_18.png"),
    require("./assets/Sausage/Sausage_19.png"),
    require("./assets/Sausage/Sausage_20.png"),
    require("./assets/Sausage/Sausage_21.png"),
    require("./assets/Sausage/Sausage_22.png"),
    require("./assets/Sausage/Sausage_23.png"),
    require("./assets/Sausage/Sausage_24.png"),
  ]
}
