import { HelloSticker, HelloStickerDimensions } from "./HelloSticker";
import { LocationSticker, LocationStickerDimensions } from "./LocationSticker";
import {
  QuestionsSticker,
  QuestionsStickerDimensions,
} from "./QuestionsSticker";
import { SupportSticker, SupportStickerDimensions } from "./SupportSticker";

export const stickers = [
  { Sticker: HelloSticker, dimensions: HelloStickerDimensions },
  { Sticker: LocationSticker, dimensions: LocationStickerDimensions },
  { Sticker: QuestionsSticker, dimensions: QuestionsStickerDimensions },
  { Sticker: SupportSticker, dimensions: SupportStickerDimensions },
];
