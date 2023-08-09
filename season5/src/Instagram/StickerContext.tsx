import type { SkMatrix, SkSize } from "@shopify/react-native-skia";
import { createContext, useContext, useReducer } from "react";
import type { ReactNode, FC } from "react";
import type { SharedValue } from "react-native-reanimated";

interface StickerProps {
  matrix: SkMatrix;
}

interface Sticker {
  Sticker: FC<StickerProps>;
  size: SkSize;
  matrix: SharedValue<SkMatrix>;
}

type Stickers = Sticker[];

interface StickerContext {
  stickers: Stickers;
  dispatch: (action: StickerAction) => void;
}

const StickerContext = createContext<StickerContext>({
  stickers: [],
  dispatch: () => [],
});

interface StickerAction {
  action: "add";
  sticker: Sticker;
}

const stickerReducer = (stickers: Stickers, action: StickerAction) => {
  return [...stickers, action.sticker];
};

export const useStickerContext = () => {
  const { stickers, dispatch } = useContext(StickerContext);
  return {
    stickers,
    addSticker: (sticker: Sticker) => dispatch({ action: "add", sticker }),
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
