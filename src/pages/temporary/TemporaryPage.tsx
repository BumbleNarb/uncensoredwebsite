const constructionImage = new URL(
  "./temporary-site-graphics.png",
  import.meta.url,
).href;

export function TemporaryPage() {
  return (
    <main className="min-h-screen w-full bg-[#ed1c24] flex items-center justify-center">
      <img
        src={constructionImage}
        alt="Under construction"
        className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain transform scale-55"
      />
    </main>
  );
}
