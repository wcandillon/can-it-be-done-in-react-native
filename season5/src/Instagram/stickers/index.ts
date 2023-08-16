import { HelloSticker, HelloStickerDimensions } from "./HelloSticker";
import { LocationSticker, LocationStickerDimensions } from "./LocationSticker";
import {
  QuestionsSticker,
  QuestionsStickerDimensions,
} from "./QuestionsSticker";
import { SkiaSticker, SkiaStickerDimensions } from "./SkiaSticker";
import { SupportSticker, SupportStickerDimensions } from "./SupportSticker";
import { TimeSticker, TimeStickerDimensions } from "./TimeSticker";

export const stickers = [
  { Sticker: HelloSticker, dimensions: HelloStickerDimensions },
  { Sticker: LocationSticker, dimensions: LocationStickerDimensions },
  { Sticker: QuestionsSticker, dimensions: QuestionsStickerDimensions },
  { Sticker: SupportSticker, dimensions: SupportStickerDimensions },
  { Sticker: TimeSticker, dimensions: TimeStickerDimensions },
  { Sticker: SkiaSticker, dimensions: SkiaStickerDimensions },
];
