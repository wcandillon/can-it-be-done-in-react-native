export { default } from "./PhilzCoffee";
import { products } from "./Model";

export const assets = products.map((product) => product.picture);
