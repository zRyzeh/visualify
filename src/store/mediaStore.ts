import type { MediaProps, MediaState } from '@definitions/media'
import { createStore } from 'zustand'

export type MediaStore = ReturnType<typeof createMediaStore>

export const createMediaStore = (initProps?: Partial<MediaProps>) => {
  const DEFAULT_PROPS: MediaProps = {
    mediaItem: "Photos",
    searchQuery: undefined
  }

  return createStore<MediaState>((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setMediaItem: (mediaItem) => {
      set(() => ({ mediaItem }))
    },
    setSearchQuery: (searchQuery) => {
      set(() => ({ searchQuery }))
    }
  }))
}