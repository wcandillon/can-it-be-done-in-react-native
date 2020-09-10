/* eslint-disable camelcase */
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
  timestamp: Date;
  percent_change: PercentChange;
}

export type Price = [string, number];

export interface Hour {
  percent_change: number;
  prices: Price[];
}

export interface Day {
  percent_change: number;
  prices: Price[];
}

export interface Week {
  percent_change: number;
  prices: Price[];
}

export interface Month {
  percent_change: number;
  prices: Price[];
}

export interface Year {
  percent_change: number;
  prices: Price[];
}

export interface All {
  percent_change: number;
  prices: Price[];
}

export interface Prices {
  latest: string;
  latest_price: LatestPrice;
  hour: Hour;
  day: Day;
  week: Week;
  month: Month;
  year: Year;
  all: All;
}

export interface Data {
  base: string;
  base_id: string;
  unit_price_scale: number;
  currency: string;
  prices: Prices;
}
