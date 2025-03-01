import { useEffect, useRef, useState } from "react";
import { HeartOutline } from "./icons/HeartIcons";
import type { Pexels } from "@interfaces/api/pexels";
import { getPhotos } from "src/api/pexels";
import { Loading } from "@components/gallery/Loading";

export const Gallery = () => {
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
      const response = await getPhotos({ page, per_page: 40 });

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
  }, [page])

  return (
    <section className="flex flex-col justify-center p-4">
      <section className="columns-1 sm:columns-2 md:columns-3 gap-4 max-w-[1600px]">
        {photos.map((photo) => (
          <article key={photo.id} className="relative overflow-hidden rounded-xl first:mt-0 mt-4 before:content-[''] before:absolute before:bottom-0 before:bg-black/20 before:w-full before:h-full before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-100 group">
            <img alt={photo.alt} src={photo.src.large2x} className="w-full" />
            <button
              className="absolute right-0 top-0 p-4 -translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-200"
              type="button"
            >
              <HeartOutline className="h-8 w-8" />
            </button>
            <div className="absolute bottom-0 flex items-center justify-between gap-2 w-full p-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-200">
              <a
                href={photo.photographer_url}
                target="_blank"
                className="text-white font-semibold"
              >
                {photo.photographer}
              </a>
              <button
                type="button"
                className="bg-green-light text-white font-semibold px-4 py-2 rounded-md"
              >
                Descargar
              </button>
            </div>
          </article>
        ))}
      </section>

      <div
        ref={loaderRef}
        className="flex justify-center items-center h-20 min-h-[5rem]"
      >
        {loading && <Loading />}
        {!hasMore && <p className="text-2xl ">¡Has llegado al final!</p>}
      </div>
    </section>
  )
}