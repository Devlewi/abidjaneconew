type Post = {
    related_articles: [];
    id: number;
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    link: string;
    featured_image: string;
    date_published: string;
    photo_credit: string;
    author: string;
    views: string;
    categories: string[];
    latest_articles: [];
    categoriesdetails: {
      name: string;
      slug: string;
      id: number;
    }[];
  };


  export interface PostCommunique {
    id: number;
    title: string;
    slug: string;
    link: string;
    date: string;
    thumbnail: string;
    featured_image: string;
    fichier_pdf_image?: string;
    views: number;
    excerpt: string;
    author: string;
    content: string;
    date_published: string;
    related_articles?: Post[];
  }

  export interface Article {
    id: number;
    title: string;
    link: string;
    excerpt: string;
    featured_image: string;
    views: string;          // ok en string, même si c'est un nombre (c’est comme ça dans ton API)
    date_published: string; // format ISO string
    slug: string;
    author: string;
  }

  export interface Pagination {
    current_page: number;
    total_pages: number;
    total_posts: number;
  }
  
  export interface CategoryArticlesResponse {
    category_name: string;
    articles: Article[];
    pagination: Pagination;
  }

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function fetchPageBySlug(slug: string, locale: string) {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch page: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}



export async function fetchPostMeta(slug: string, locale: string): Promise<Post | null> {
    try {
      const res = await fetch(
        `${BASE_URL}/wp-json/custom/v1/article/meta/${slug}/${locale}`
      );
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
  

  export async function fetchPost(slug: string, locale: string): Promise<Post | null> {
    try {
      const res = await fetch(
        `${BASE_URL}/wp-json/custom/v1/article/${slug}/${locale}`,
        { next: { revalidate: 60 } }
      );
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }



  export async function fetchCategoryMeta(slug: string): Promise<CategoryArticlesResponse | null> {
    try {
      const res = await fetch(`${BASE_URL}/wp-json/custom-api/publications/slug-categorie/${slug}/`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }


  export async function fetchCategoryArticles(slug: string, page = 1): Promise<CategoryArticlesResponse | null> {
    try {
      const res = await fetch(`${BASE_URL}/wp-json/custom-api/publications/slug-categorie/${slug}/?page=${page}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
  

  
  export async function fetchCommunique(slug: string, locale: string): Promise<PostCommunique | null> {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/communique/${slug}/${locale}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }





  // Typage (tu peux l'extraire dans un fichier types si tu veux)
export type CommuniqueItem = {
    id: number;
    date: string;
    title: string;
    content: string;
    slug: string;
    fichier_pdf_image?: string;
    views?: number;
  };
  
  type ApiResponse = {
    data: CommuniqueItem[];
    total_pages?: number;
  };
  
  export async function fetchCommuniques(
    locale: string,
    page = 1,
    perPage = 10
  ): Promise<ApiResponse | null> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/communiques?lang=${locale}&page=${page}&per_page=${perPage}`
      );
      if (!res.ok) return null;
  
      return await res.json();
    } catch (error) {
      console.error("Erreur API fetchCommuniques:", error);
      return null;
    }
  }




  export async function fetchFeaturedVideos(locale: string, page = 1, perPage = 9) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/featured-videos?lang=${locale}&page=${page}&per_page=${perPage}`
      );
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error("Erreur API fetchFeaturedVideos:", error);
      return null;
    }
  }

  
// services/api.ts
export async function fetchFlashInfo(locale: string, page: number, perPage: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/flash_info?page=${page}&per_page=${perPage}&lang=${locale}`
    );
  
    if (!res.ok) {
      throw new Error("Erreur lors du chargement des flash info");
    }
  
    const result = await res.json();
  
    // Assure-toi que result.items et result.total_pages existent bien
    return {
      items: result.items || [],
      totalPages: result.total_pages || 1,
    };
  }

  
  export async function searchApi(query: string, locale: string, page: number, perPage = 6) {
    if (!query.trim()) return null;
  
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/search?q=${encodeURIComponent(
      query.trim()
    )}&lang=${locale}&page=${page}&per_page=${perPage}`;
  
    const res = await fetch(apiUrl);
  
    if (!res.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
  
    const data = await res.json();
    return data;
  }
  
  
  
  // services/api.ts

  // services/api.ts

export const subscribeToNewsletter = async (email: string): Promise<Response> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/newsletter/v1/subscribe`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  return response;
};


// services/api.ts

export const getLastPosts = async (locale: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/six-last-posts/?lang=${locale}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des articles");
  }

  return res.json();
};






export const fetchFeaturedVideoResponse = async (slug: string): Promise<Response> => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/featuredvideo/${slug}`,
    {
      next: { revalidate: 60 },
    }
  );
};




// services/api.ts



export const getLastUpdate = async (): Promise<{ last_update: string }> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/last-update/`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Erreur lors de la récupération de la dernière mise à jour");
  }
  return res.json();
};


// services/api.js

export const fetchStickyStatus = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/sticky-status`
    );
    const data = await response.json();

    return data.sticky_active; // "Oui" ou "Non"
  } catch (error) {
    console.error("Erreur lors de la récupération du sticky status :", error);
    return null; // valeur par défaut
  }
};
