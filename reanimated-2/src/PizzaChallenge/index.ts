import {assets as pizzaAsset} from "./PizzaChallenge";
export {default} from "./PizzaChallenge";
export const assets = Object.values(pizzaAsset).map(asset => Array.isArray(asset) ? asset.flat() : asset);