import { useEffect, useRef, useState } from "react";
import type { Pexels } from "@interfaces/api/pexels";
import { getPhotos } from "src/api/pexels";
import { Loading } from "@components/gallery/Loading";
import { Photo } from "@components/gallery/Photo";
import Masonry from "react-masonry-css";

type MediaItem = "Photos" | "Videos"

export const Gallery = ({ mediaItem }: { mediaItem: MediaItem }) => {
  const [photos, setPhotos] = useState<Pexels["photos"]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const photosRef = useRef(photos);

  loadingRef.current = loading;
  hasMoreRef.current = hasMore;
  photosRef.current = photos;

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await getPhotos({ page, per_page: 21 });

      if (response.photos.length === 0) {
        setHasMore(false);
        return;
      }

      const existingIds = new Set(photosRef.current.map(p => p.id));
      const newPhotos = response.photos.filter(p => !existingIds.has(p.id));

      setPhotos((prev) => [...prev, ...newPhotos]);
    } catch (error) {
      console.error("Error fetching photos: ", error);
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
    fetchPhotos();
  }, [page]);

  return (
    <section className="flex flex-col items-center p-4">
      <div>
        {
          photos.length > 0 &&
          <h2 className="text-2xl font-semibold py-8">Popular {mediaItem}</h2>
        }

        <Masonry
          breakpointCols={{
            default: 3,
            1024: 2,
            640: 1
          }}
          className="flex -ml-4 w-auto max-w-[1500px]"
          columnClassName="pl-4"
        >
          {photos.map((photo) => (
            <div key={photo.id} className="mb-4">
              <Photo photo={photo} />
            </div>
          ))}
        </Masonry>
      </div>


      <div
        ref={loaderRef}
        className="flex justify-center items-center h-20 min-h-[5rem]"
      >
        {loading && <Loading />}
        {!hasMore && <p className="text-2xl ">¡Has llegado al final!</p>}
      </div>
    </section>
  );
};