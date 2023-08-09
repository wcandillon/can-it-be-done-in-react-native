import { Instagram as Main } from "./Instagram";
import { StickerProvider } from "./StickerContext";
export * from "./StickerModal";

export const Instagram = () => {
  return (
    <StickerProvider>
      <Main />
    </StickerProvider>
  );
};
