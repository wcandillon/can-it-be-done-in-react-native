// @flow
/* eslint-disable global-require */
import { Asset } from "expo";

const Homes = require("../assets/images/homes.jpg");
const Experiences = require("../assets/images/experiences.jpg");
const Restaurants = require("../assets/images/restaurants.jpg");

const CapeTown = require("../assets/images/cities/cape-town.jpg");
const London = require("../assets/images/cities/london.jpg");
const LosAngeles = require("../assets/images/cities/los-angeles.jpg");
const Miami = require("../assets/images/cities/miami.jpg");
const Nairobi = require("../assets/images/cities/nairobi.jpg");
const Paris = require("../assets/images/cities/paris.jpg");
const SanFrancisco = require("../assets/images/cities/san-francisco.jpg");
const Tokyo = require("../assets/images/cities/tokyo.jpg");

export {
  Homes,
  Experiences,
  Restaurants,

  CapeTown,
  London,
  LosAngeles,
  Miami,
  Nairobi,
  Paris,
  SanFrancisco,
  Tokyo,
};

export const downloadImagesAsync = () => ([
  Asset.loadAsync(Homes),
  Asset.loadAsync(Experiences),
  Asset.loadAsync(Restaurants),

  Asset.loadAsync(CapeTown),
  Asset.loadAsync(London),
  Asset.loadAsync(LosAngeles),
  Asset.loadAsync(Miami),
  Asset.loadAsync(Nairobi),
  Asset.loadAsync(Paris),
  Asset.loadAsync(SanFrancisco),
  Asset.loadAsync(Tokyo),
]);
