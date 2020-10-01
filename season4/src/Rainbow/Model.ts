/* eslint-disable camelcase */
import { Dimensions } from "react-native";

export const SIZE = Dimensions.get("window").width;

export interface Amount {
  amount: string;
  currency: string;
  scale: string;
}

export interface PercentChange {
  hour: number;
  day: number;
  week: number;
  month: number;
  year: number;
}

export interface LatestPrice {
  amount: Amount;
  timestamp: string;
  percent_change: PercentChange;
}

export type Price = [string, number];
export type PriceList = [string, number][];

export interface DataPoints {
  percent_change: number;
  prices: PriceList;
}

export interface Prices {
  latest: string;
  latest_price: LatestPrice;
  hour: DataPoints;
  day: DataPoints;
  week: DataPoints;
  month: DataPoints;
  year: DataPoints;
  all: DataPoints;
}

export interface Data {
  base: string;
  base_id: string;
  unit_price_scale: number;
  currency: string;
  prices: Prices;
}
