import { ImageRequireSource } from "react-native";

export interface App {
  id: number;
  title: string;
  subtitle: string;
  source: ImageRequireSource;
  content: string;
}

export type Apps = App[];

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}
