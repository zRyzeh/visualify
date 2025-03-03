import { useEffect, useRef } from "react";

export const useInfiniteScroll = (loadMore: () => void, isLoading: boolean, hasMore: boolean) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(isLoading);
  isLoadingRef.current = isLoading;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingRef.current && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, loadMore]);

  return loaderRef;
};