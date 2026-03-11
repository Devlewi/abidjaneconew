import { notFound } from "next/navigation";
import Link from "next/link";
import he, { decode } from "he";
import CatArticleList from "@/app/ui/CatArticleList";
import { getTranslation } from "@/app/utils/i18n";
import SidebarLatestPosts from "@/app/ui/SidebarLatestPosts";
import { Metadata } from "next";
import { fetchCategoryArticles, fetchCategoryMeta } from "@/app/services/api";

type Props = {
  params: Promise<{ locale: string; slug: string }>; // On ajoute slug ici
};



  const siteDomain = process.env.NEXT_PUBLIC_API_BASE_URL || "";
// ✅ Meta avec Promise pour params
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  console.log(locale);

  try {
    // Récupérer les publications de la catégorie spécifique
 const data = await fetchCategoryMeta(slug);
 
     if (!data) {
       // Si pas de données, renvoyer un objet vide ou un fallback
       return {};
     }
     
    const firstPost = data.articles[0];

    const categoryName = data.category_name || "Category";
    
    
    // Vérifier s’il y a au moins un article
    if (data.articles.length === 0) {

      const alternates: Metadata['alternates'] = {
        languages: {
          fr: `${siteDomain}/fr`,
          en: `${siteDomain}/en`,
          "x-default": `${siteDomain}/fr`,
        },
      };
    
      return {
        title: "CAMEROON ECO - " + categoryName,
        description: `No data for the category ${categoryName}`,
        alternates,
      };
    }


    return {
      title: "CAMEROON ECO - " + he.decode(data.category_name),
      description: he.decode(firstPost.excerpt),
      openGraph: {
        title: he.decode(data.category_name),
        description: he.decode(firstPost.excerpt),
        images: [firstPost.featured_image],
        url: he.decode(firstPost.link),
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: he.decode(data.category_name),
        description: he.decode(firstPost.excerpt),
        images: [firstPost.featured_image],
      },
    };
  } catch {
    return {};
  }
}

export default async function PostPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale, slug } = await params; // Attendre que `params` soit résolu
  const sp = await searchParams;
  const page = parseInt(sp.page || "1", 10);

  const t = getTranslation(locale); // locale = "fr" ou "en"
  const latest = t.latest || '';
  const articl = t.articles || '';
  const next = t.next || "";
  const previous = t.previous || "";
  //const category = t.category || '';  

  try {
    // Récupérer les publications de la catégorie spécifique
        // Récupérer les publications de la catégorie spécifique
        const data = await fetchCategoryArticles(slug, page);
    
        if (!data) return notFound();
    //console.log(data);

    // Récupérer les articles et la pagination
    const articles = data.articles;
    const pagination = data.pagination;
    const category = t.category || "";
    // Nombre total de pages
    const totalPages = pagination.total_pages;

    // Créer une fonction pour déterminer quelles pages afficher
    const generatePageNumbers = (currentPage: number, totalPages: number) => {
      const range = [];
      const maxDisplayedPages = 5; // Le nombre de pages à afficher avant de mettre des "..."

      // Afficher la première page
      range.push(1);

      // Si le nombre total de pages est plus grand que le nombre maximal de pages à afficher
      if (totalPages > maxDisplayedPages) {
        // Ajouter les points de suspension si la page actuelle est trop éloignée de la première page
        if (currentPage > 3) range.push("...");

        // Ajouter les pages proches de la page actuelle
        if (currentPage > 2) range.push(currentPage - 1);
        range.push(currentPage); // Ajoute la page actuelle une seule fois

        // Ajouter les pages après la page actuelle
        if (currentPage < totalPages - 1) range.push(currentPage + 1);

        // Ajouter les points de suspension si la page actuelle est trop éloignée de la dernière page
        if (currentPage < totalPages - 2) range.push("...");
      } else {
        // Si moins de pages, afficher toutes les pages
        for (let i = 2; i <= totalPages; i++) {
          range.push(i);
        }
      }

      // Ajouter la dernière page seulement si elle n'est pas déjà dans la liste
      if (!range.includes(totalPages)) {
        range.push(totalPages);
      }

      return range;
    };

    return (
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <h1 className="archive-heading">
              <span className="capitalize">{category}: {decode(data.category_name)}</span>
            </h1>
            <section
              className="block-wrap block-posts-list mb-none"
              data-id={7}
            >
              <div className="block-content mt-4">
              <CatArticleList data={data.articles} categoryName={he.decode(data.category_name)} locale={locale} />


                {/* Pagination dynamique */}
                {articles.length > 0 && totalPages > 1 && (
                <nav
                  className="main-pagination pagination-numbers mt-6 flex flex-wrap gap-2"
                  data-type="numbers"
                >
                  {/* Bouton "Précédent" uniquement si ce n'est pas la première page */}
                  {page > 1 && (
                    <Link
                      href={`/${locale}/${category}/${slug}?page=${page - 1}`}
                      className="prev page-numbers px-3 py-1 rounded border bg-white  text-[#1a2a54] hover:bg-blue-100 text-[15px] border-blue-300"
                    >
                      ← {previous}
                    </Link>
                  )}

                  {/* Affiche les numéros de page avec des points de suspension si nécessaire */}
                  {generatePageNumbers(page, totalPages).map((pageNum, index) =>
                    pageNum === "..." ? (
                      <span key={index} className="page-numbers dots">
                        ...
                      </span>
                    ) : (
                      <Link
                        key={index}
                        href={`/${locale}/${category}/${slug}?page=${pageNum}`}
                        className={`page-numbers px-3 py-1 rounded border text-[16px] ${
                          pageNum === page
                            ? "bg-[#1a2a54] text-white border-[#1a2a54]"
                            : "bg-white text-[#1a2a54] border-blue-300 hover:bg-blue-100"
                        }`}
                        aria-current={pageNum === page ? "page" : undefined}
                      >
                        {pageNum}
                      </Link>
                    )
                  )}

                  {/* Bouton "Suivant" uniquement si ce n'est pas la dernière page */}
                  {page < totalPages && (
                    <Link
                      href={`/${locale}/${category}/${slug}?page=${page + 1}`}
                      className="next page-numbers px-3 py-1 rounded border border-blue-300 text-[#1a2a54] hover:bg-blue-100 text-[15px]"
                    >
                      {next} → 
                    </Link>
                  )}
                </nav>
                )}
              </div>
            </section>
          </div>

          <SidebarLatestPosts
  locale={locale}
  latest={latest}
  articles={articl}
/>
        </div>
      </div>
    );
  } catch {
    return notFound();
  }
}
