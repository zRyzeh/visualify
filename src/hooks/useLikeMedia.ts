import type { MediaItem } from "@definitions/media";
import { useState } from "react";

interface UseLikeMediaProps {
  id: number;
  mediaItem: MediaItem;
}

type UseLikeMediaReturn = [
  boolean,
  () => void
]

export const useLikeMedia = ({ id, mediaItem }: UseLikeMediaProps): UseLikeMediaReturn => {
  const [liked, setLiked] = useState(isLikedMedia(id, mediaItem));

  const toggleLikeMedia = () => {
    const isLiked = isLikedMedia(id, mediaItem)

    if (isLiked) {
      unlikeMedia(id, mediaItem)
    } else {
      likeMedia(id, mediaItem)
    }

    setLiked(!isLiked);
  }

  return [liked, toggleLikeMedia]
}

const getLikedMedia = (mediaItem: MediaItem): number[] => {
  return JSON.parse(localStorage.getItem(mediaItem) || "[]");
}

const isLikedMedia = (id: number, mediaItem: MediaItem) => {
  const likedMedia = getLikedMedia(mediaItem);
  return likedMedia.some((mediaId) => id === mediaId);
}


const unlikeMedia = (id: number, mediaItem: MediaItem) => {
  const likedMedia = getLikedMedia(mediaItem);
  const newLikedMedia = likedMedia.filter((mediaId) => id !== mediaId);
  localStorage.setItem(mediaItem, JSON.stringify(newLikedMedia));
}

const likeMedia = (id: number, mediaItem: MediaItem) => {
  const likedMedia = getLikedMedia(mediaItem);
  const newLikedMedia = [...likedMedia, id];
  localStorage.setItem(mediaItem, JSON.stringify(newLikedMedia));
}