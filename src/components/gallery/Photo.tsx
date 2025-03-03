import type { PexelsPhoto } from "@interfaces/api/photos";
import { useState } from "react";
import { Skeleton } from "./Skeleton";
import { BtnDownload } from "@components/common/BtnDownload";
import { BtnLike } from "@components/common/BtnLike";

interface PhotoProps {
  photo: PexelsPhoto
}

export const Photo = ({ photo }: PhotoProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const aspectRatio = photo.width / photo.height

  return (
    <article className="relative overflow-hidden rounded-xl shadow-lg before:content-[''] before:absolute before:top-0 before:left-0 before:bg-gradient-to-b before:from-black/25 before:to-transparent before:w-full before:h-24 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-black/30 after:to-transparent after:w-full after:h-40 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 group">
      {!imageLoaded && (
        <Skeleton aspectRatio={aspectRatio} />
      )}

      <img
        alt={photo.alt}
        src={photo.src.large}
        className="w-full min-h-[550px] object-cover"
        onLoad={() => setImageLoaded(true)}
      />

      <BtnLike id={photo.id} mediaItem={"Photos"} />

      <div className="z-1000 absolute bottom-0 flex items-center justify-between gap-2 w-full p-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-200">
        <a
          href={photo.photographer_url}
          target="_blank"
          className="text-white font-semibold"
        >
          {photo.photographer}
        </a>
        <BtnDownload url={new URL(photo.src.original)} />
      </div>
    </article>
  );
}