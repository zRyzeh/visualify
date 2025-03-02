import { useState, useRef } from "react";
import type { PexelsVideo } from "@interfaces/api/videos";
import { HeartOutline } from "./icons/HeartIcons";
import { Skeleton } from "./Skeleton";

interface VideoProps {
  video: PexelsVideo;
}

export const Video = ({ video }: VideoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const aspectRatio = video.width / video.height;
  const videoSource = video.video_files.find(file => file.quality === "hd")?.link || video.video_files[0].link;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoLoaded) videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <article
      className="relative w-full overflow-hidden rounded-xl shadow-lg min-h-[550px] before:content-[''] before:z-100 before:absolute before:top-0 before:left-0 before:bg-gradient-to-b before:from-black/25 before:to-transparent before:w-full before:h-24 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-black/30 after:to-transparent after:w-full after:h-40 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 group"
      style={{ aspectRatio }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!imageLoaded && (
        <Skeleton aspectRatio={aspectRatio} />
      )}

      <div className={`relative w-full h-full transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {
          !videoLoaded &&
          <img
            src={video.image}
            alt="Video thumbnail"
            className={`w-full h-full object-cover`}
            onLoad={() => setImageLoaded(true)}
          />
        }

        {
          isHovered &&
          <video
            ref={videoRef}
            src={videoSource}
            className="absolute top-0 left-0 object-cover min-h-[550px]"
            onCanPlayThrough={() => setVideoLoaded(true)}
            muted
            autoPlay
            loop
            preload="auto"
          />
        }
      </div>

      {imageLoaded && (
        <>
          <button
            className="z-1000 absolute right-0 top-0 p-4 -translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-200"
            type="button"
          >
            <HeartOutline className="h-8 w-8" />
          </button>

          <div className="z-1000 absolute bottom-0 flex items-center justify-between gap-2 w-full p-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-200">
            <a
              href={video.user.url}
              target="_blank"
              className="text-white font-semibold"
            >
              {video.user.name}
            </a>
            <button
              type="button"
              className="bg-green-light text-white font-semibold px-4 py-2 rounded-md"
            >
              Download
            </button>
          </div>
        </>
      )}
    </article>
  );
};