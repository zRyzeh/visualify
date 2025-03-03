import Masonry from "react-masonry-css";
import { Photo } from "@components/gallery/Photo";
import { Video } from "@components/gallery/Video";
import type { PexelsPhoto } from "@interfaces/api/photos";
import type { PexelsVideo } from "@interfaces/api/videos";
import { useMediaContext } from "@hooks/useMediaContext";

interface MediaGridProps {
  media: (PexelsPhoto | PexelsVideo)[];
}

export const MediaMasonry = ({ media }: MediaGridProps) => {
  const mediaItem = useMediaContext((state) => state.mediaItem)

  return (
    <Masonry
      breakpointCols={{
        default: 3,
        1024: 2,
        640: 1
      }}
      className="flex -ml-4 w-screen max-w-[1550px] px-6"
      columnClassName="pl-4"
    >
      {media.map((m) => (
        <div key={m.id} className="mb-4">
          {mediaItem === "Photos"
            ? <Photo photo={m as PexelsPhoto} />
            : <Video video={m as PexelsVideo} />}
        </div>
      ))}
    </Masonry>
  );
}
