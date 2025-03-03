import { useMediaFetcher } from "@hooks/useMediaFetcher";
import { MediaMasonry } from "@components/gallery/MediaMasonry";
import { MediaLoader } from "@components/gallery/MediaLoader";
import { useMediaContext } from "@hooks/useMediaContext";

export const GalleryContent = () => {
  const { media, isLoading, hasMore, error, page, setPage } = useMediaFetcher();
  const loadMore = () => setPage(prev => prev + 1);
  const mediaItem = useMediaContext(state => state.mediaItem)
  const searchQuery = useMediaContext(state => state.searchQuery)

  const getGalleryTitle = () => {
    return searchQuery
      ? `${mediaItem} of ${searchQuery}`
      : `Popular ${mediaItem}`;
  };

  return (
    <section className="flex flex-col items-center">
      <div>
        {media.length > 0 && (
          <h2 className="text-2xl font-semibold pb-8 px-6">
            {getGalleryTitle()}
          </h2>
        )}

        <MediaMasonry media={media} />
      </div>

      <MediaLoader
        loadMore={loadMore}
        isLoading={isLoading}
        hasMore={hasMore}
        error={error}
        page={page}
      />
    </section>
  );
};