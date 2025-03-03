import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const API_KEY = import.meta.env.PEXELS_API_KEY;
  const DEFAULT_PAGE = 1;
  const DEFAULT_PER_PAGE = 20;

  const url = new URL(request.url);
  const query = url.searchParams.get("query")

  if (!query) {
    return new Response(JSON.stringify({ error: "The 'query' parameter is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const page = url.searchParams.get("page") || DEFAULT_PAGE;
  const per_page = url.searchParams.get("per_page") || DEFAULT_PER_PAGE;

  const apiUrl = `https://api.pexels.com/v1/videos/search?query=${query}&page=${page}&per_page=${per_page}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: API_KEY,
      },
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error((error as Error).stack)

    const res = { error: "Server Internal Error" }
    return new Response(JSON.stringify(res), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }



}
