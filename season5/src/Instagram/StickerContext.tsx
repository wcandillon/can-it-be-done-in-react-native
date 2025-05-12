import type { Matrix4 } from "@shopify/react-native-skia";
import { createContext, useCallback, useContext, useReducer } from "react";
import type { ReactNode, FC } from "react";
import type { SharedValue } from "react-native-reanimated";

import type { StickerProps } from "./stickers/Sticker";
import { type StickerDimensions } from "./stickers/types";

export interface Sticker {
  Sticker: FC<StickerProps>;
  size: StickerDimensions;
  matrix: SharedValue<Matrix4>;
}

type Stickers = Sticker[];

interface StickerContext {
  stickers: Stickers;
  dispatch: (action: StickerAction) => void;
}

const StickerContext = createContext<StickerContext | null>(null);

interface StickerAction {
  action: "add";
  sticker: Sticker;
}

const stickerReducer = (stickers: Stickers, action: StickerAction) => {
  return [...stickers, action.sticker];
};

export const useStickerContext = () => {
  const ctx = useContext(StickerContext);
  if (ctx === null) {
    throw new Error("No Sticker context found");
  }
  const { stickers, dispatch } = ctx;
  const addSticker = useCallback(
    (sticker: Sticker) => {
      dispatch({ action: "add", sticker });
    },
    [dispatch]
  );
  return {
    stickers,
    addSticker,
  };
};

interface StickerProviderProps {
  children: ReactNode | ReactNode[];
}

export const StickerProvider = ({ children }: StickerProviderProps) => {
  const [stickers, dispatch] = useReducer(stickerReducer, []);
  return (
    <StickerContext.Provider value={{ stickers, dispatch }}>
      {children}
    </StickerContext.Provider>
  );
};
