interface SkeletonProps {
  aspectRatio: number
}

export const Skeleton = ({ aspectRatio }: SkeletonProps) => (
  <div
    className="absolute inset-0 bg-gray-300 animate-pulse"
    style={{ aspectRatio }}
  />
);