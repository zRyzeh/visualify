import type { Pexels } from "@interfaces/api/pexels";
const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 20

export const getPhotos = async ({ page = DEFAULT_PAGE, per_page = DEFAULT_PER_PAGE } = {}) => {
  const apiURL = `http://localhost:4321/api/pexels?page=${page}&per_page=${per_page}`

  const apiResponse: Pexels = await fetch(apiURL)
    .then((res) => res.json())
    .catch((err) => console.error("Error:", err));

  return apiResponse;
}
