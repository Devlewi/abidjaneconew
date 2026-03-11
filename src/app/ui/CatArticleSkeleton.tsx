// ArticleSkeleton.tsx
export default function CatArticleSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <article
          key={index}
          className="l-post small-post small-a-post m-pos-left animate-pulse"
          style={{ marginBottom: -10 }}
        >
          <div className="small-media">
            <div className="w-full h-[235px] bg-gray-200 border border-gray-300 rounded-md" />
          </div>

          <div className="content">
            <div>
              <div className="bg-gray-300 h-6 w-32 rounded-md px-4 py-1.5 mb-4 inline-block" />

              <h2 className="mb-2 text-[18px] font-bold text-[#db2e44]">
                <div className="h-4 bg-gray-300 rounded w-[90%] mb-1" />
                <div className="h-4 bg-gray-300 rounded w-[70%]" />
              </h2>

              <div className="text-[13px] leading-relaxed text-[#1a2a54]">
                <div className="h-3 bg-gray-200 rounded w-[95%] mb-1" />
                <div className="h-3 bg-gray-200 rounded w-[80%] mb-1" />
                <div className="h-3 bg-gray-200 rounded w-[60%]" />
              </div>

              
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
