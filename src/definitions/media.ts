export type MediaItem = "Photos" | "Videos";

export interface MediaProps {
  mediaItem: MediaItem;
  searchQuery: string | undefined;
}

export interface MediaState extends MediaProps {
  setMediaItem: (mediaItem: MediaItem) => void;
  setSearchQuery: (searchQuery: string | undefined) => void
}