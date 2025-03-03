export interface PexelsVideos {
  page: number;
  per_page: number;
  videos: PexelsVideo[];
  total_results: number;
  next_page: string;
  url: string;
  error: string;
}

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  duration: number;
  full_res: null | string;
  tags: string[];
  url: string;
  image: string;
  avg_color: null | string;
  user: User;
  video_files: VideoFile[];
  video_pictures: VideoPicture[];
}

interface User {
  id: number;
  name: string;
  url: string;
}

interface VideoFile {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  fps: number;
  link: string;
  size: number;
}

interface VideoPicture {
  id: number;
  nr: number;
  picture: string;
}