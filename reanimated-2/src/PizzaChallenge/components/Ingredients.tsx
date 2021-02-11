import React from "react";

import Ingredient from "./Ingredient";

interface BasilProps {
  assets: ReturnType<typeof require>[];
  zIndex: number;
}

const Ingredients = ({ assets, zIndex }: BasilProps) => {
  if (zIndex === 0) {
    return null;
  }
  return (
    <>
      {assets.map((asset, index) => (
        <Ingredient
          zIndex={zIndex}
          total={assets.length}
          key={index}
          asset={asset}
          index={index}
        />
      ))}
    </>
  );
};

export default Ingredients;
