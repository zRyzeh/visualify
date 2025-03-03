import { MediaProvider } from "@components/providers/mediaProvider";
import type { MediaItem } from "@definitions/media";
import { GalleryContent } from "./GalleryContent";

interface GalleryProps {
  mediaItem: MediaItem;
  searchQuery?: string;
}

export const Gallery = ({ mediaItem, searchQuery }: GalleryProps) => {
  return (
    <MediaProvider mediaItem={mediaItem} searchQuery={searchQuery}>
      <GalleryContent />
    </MediaProvider>
  );
};