import { MediaContext } from "@context/mediaContext";
import type { MediaState } from "@definitions/media";
import { useContext } from "react";
import { useStore } from "zustand";

export const useMediaContext = <T>(selector: (state: MediaState) => T): T => {
  const store = useContext(MediaContext)
  if (!store) throw new Error('Missing MediaContext.Provider in the tree.')

  return useStore(store, selector);
}