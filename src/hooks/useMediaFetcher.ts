import { useState, useEffect, useCallback } from "react";
import { getPhotos, getPhotosByQuery, getVideos, getVideosByQuery } from "@api/pexels";
import type { PexelsPhoto, PexelsPhotos } from "@interfaces/api/photos";
import type { PexelsVideo, PexelsVideos } from "@interfaces/api/videos";
import type { MediaItem } from "@definitions/media";
import { useMediaContext } from "./useMediaContext";

export const useMediaFetcher = () => {
  const [media, setMedia] = useState<(PexelsPhoto | PexelsVideo)[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const mediaItem = useMediaContext((state) => state.mediaItem)
  const searchQuery = useMediaContext((state) => state.searchQuery)

  const fetchMedia = useCallback(async () => {
    try {
      setIsLoading(true);
      let response;
      if (mediaItem === "Photos") {
        response = searchQuery
          ? await getPhotosByQuery({ query: searchQuery, page, per_page: 21 })
          : await getPhotos({ page, per_page: 21 });
      } else {
        response = searchQuery
          ? await getVideosByQuery({ query: searchQuery, page, per_page: 21 })
          : await getVideos({ page, per_page: 21 });
      }

      if (response.error) {
        setError(true);
        return;
      }

      const mediaCollection = getMediaCollection(response, mediaItem);
      if (mediaCollection.length === 0) {
        setHasMore(false);
        return;
      }

      const existingIds = new Set(media.map(m => m.id));
      const newMedia = mediaCollection.filter(item => !existingIds.has(item.id));

      setMedia(prev => [...prev, ...newMedia]);
    } catch (err) {
      console.error("Error fetching media: ", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [mediaItem, searchQuery, page, media]);

  useEffect(() => {
    fetchMedia();
  }, [page]);

  return { media, isLoading, hasMore, error, page, setPage, fetchMedia };
};

const getMediaCollection = (response: any, mediaItem: MediaItem) => {
  return mediaItem === "Photos"
    ? (response as PexelsPhotos).photos
    : (response as PexelsVideos).videos;
};