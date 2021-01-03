export { default } from "./PhilzCoffee";
import { products } from "./Model";
import { cards } from "./components/Cards";

export const assets = products
  .map((product) => product.picture)
  .concat(cards.map((card) => card.picture));
