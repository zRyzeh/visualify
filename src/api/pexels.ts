import type { PexelsPhotos } from "@interfaces/api/photos";
import type { PexelsVideos } from "@interfaces/api/videos";

interface Search {
  page?: number,
  per_page?: number
}

interface QuerySearch {
  query: string,
  page?: number,
  per_page?: number
}

const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 20

export const getPhotos = async ({ page = DEFAULT_PAGE, per_page = DEFAULT_PER_PAGE }: Search) => {
  const apiURL = `http://localhost:4321/api/photos/popular?page=${page}&per_page=${per_page}`

  const photos: PexelsPhotos = await fetch(apiURL)
    .then((res) => res.json())

  return photos;
}

export const getPhotosByQuery = async ({ query, page = DEFAULT_PAGE, per_page = DEFAULT_PER_PAGE }: QuerySearch) => {
  const apiURL = `http://localhost:4321/api/photos/search?query=${query}&page=${page}&per_page=${per_page}`

  const photos: PexelsPhotos = await fetch(apiURL)
    .then((res) => res.json())

  return photos;
}

export const getVideos = async ({ page = DEFAULT_PAGE, per_page = DEFAULT_PER_PAGE }: Search) => {
  const apiURL = `http://localhost:4321/api/videos/popular?page=${page}&per_page=${per_page}`

  const videos: PexelsVideos = await fetch(apiURL)
    .then((res) => res.json())

  return videos;
}

export const getVideosByQuery = async ({ query, page = DEFAULT_PAGE, per_page = DEFAULT_PER_PAGE }: QuerySearch) => {
  const apiURL = `http://localhost:4321/api/videos/search?query=${query}&page=${page}&per_page=${per_page}`

  const videos: PexelsVideos = await fetch(apiURL)
    .then((res) => res.json())

  return videos;
}