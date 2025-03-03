import { Loader } from "@components/common/Loader";
import { BtnGoUp } from "@components/common/BtnGoUp";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";

interface MediaLoaderProps {
  loadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  error: boolean;
  page: number;
}

export const MediaLoader = ({ loadMore, isLoading, hasMore, error, page }: MediaLoaderProps) => {
  const loaderRef = useInfiniteScroll(loadMore, isLoading, hasMore);

  return (
    <div
      ref={loaderRef}
      className="flex justify-center items-center h-20 min-h-[5rem]"
    >
      {isLoading && hasMore && <Loader />}
      {!hasMore && (page === 1
        ? <div className="text-xl">No items found.</div>
        : <BtnGoUp />)}
      {error && <div className="text-xl">An error occurred on the server.</div>}
    </div>
  );
}
