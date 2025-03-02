import { useEffect, useRef, useState } from "react";
import type { PexelsPhoto, PexelsPhotos } from "@interfaces/api/photos";
import { getPhotos, getPhotosByQuery, getVideos, getVideosByQuery } from "@api/pexels";
import { Loader } from "@components/common/Loader";
import { Photo } from "@components/gallery/Photo";
import Masonry from "react-masonry-css";
import type { PexelsVideo, PexelsVideos } from "@interfaces/api/videos";
import { Video } from "@components/gallery/Video";
import { BtnGoUp } from "@components/common/BtnGoUp"

type MediaItem = "Photos" | "Videos";

interface GalleryProps {
  mediaItem: MediaItem;
  searchQuery?: string;
}

export const Gallery = ({ mediaItem, searchQuery }: GalleryProps) => {
  const [media, setMedia] = useState<PexelsPhotos["photos"] | PexelsVideos["videos"]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const mediaRef = useRef(media);

  loadingRef.current = loading;
  hasMoreRef.current = hasMore;
  mediaRef.current = media;

  const fetchMedia = async () => {
    try {
      setLoading(true);

      let response;
      let fetchedMedia: PexelsPhoto[] | PexelsVideo[];
      if (mediaItem === "Photos") {
        response = searchQuery
          ? await getPhotosByQuery({ query: searchQuery, page, per_page: 21 })
          : await getPhotos({ page, per_page: 21 });

        if (response.photos.length === 0) {
          setHasMore(false);
          return;
        }
        fetchedMedia = response.photos;
      } else {
        response = searchQuery
          ? await getVideosByQuery({ query: searchQuery, page, per_page: 21 })
          : await getVideos({ page, per_page: 21 });

        if (response.videos.length === 0) {
          setHasMore(false);
          return;
        }
        fetchedMedia = response.videos;
      }

      const existingIds = new Set(mediaRef.current.map(m => m.id));
      const newMedia = fetchedMedia.filter(item => !existingIds.has(item.id));

      setMedia((prev) => {
        if (mediaItem === "Photos") {
          return [...(prev as PexelsPhoto[]), ...(newMedia as PexelsPhoto[])];
        } else {
          return [...(prev as PexelsVideo[]), ...(newMedia as PexelsVideo[])];
        }
      });
    } catch (error) {
      console.error("Error fetching media: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loadingRef.current &&
          hasMoreRef.current
        ) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [page]);

  return (
    <section className="flex flex-col items-center">
      <div>
        {media.length > 0 && (
          <h2 className="text-2xl font-semibold pb-8 px-6">{
            searchQuery
              ? `${mediaItem} of ${searchQuery}`
              : `Popular ${mediaItem}`
          }</h2>
        )}

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
      </div>

      <div
        ref={loaderRef}
        className="flex justify-center items-center h-20 min-h-[5rem]"
      >
        {loading && <Loader />}
        {
          !hasMore && (page === 1
            ? <div className="text-xl">No items found.</div>
            : <BtnGoUp />)
        }
      </div>
    </section>
  );
};