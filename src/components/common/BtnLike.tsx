import { HeartOutline, Heart } from "@components/gallery/icons/HeartIcons";
import type { MediaItem } from "@definitions/media";
import { useEffect } from "react";
import { useLikeMedia } from "src/hooks/useLikeMedia";

interface BtnLikeProps {
  id: number;
  mediaItem: MediaItem;
}

export const BtnLike = ({ id, mediaItem }: BtnLikeProps) => {
  const [liked, toggleLikeMedia] = useLikeMedia({ id, mediaItem });

  return (
    <button
      className="z-1000 absolute right-0 top-0 p-4 -translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-200 cursor-pointer"
      type="button"
      onClick={toggleLikeMedia}
    >
      {
        liked
          ? <Heart className="h-8 w-8" />
          : <HeartOutline className="h-8 w-8" />
      }
    </button>
  );
};
