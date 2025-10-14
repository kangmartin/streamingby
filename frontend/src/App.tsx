import { useState, useEffect, useCallback } from 'react';
import { Filters } from './components/Filters';
import { ContentGrid } from './components/ContentGrid';
import { SkeletonGrid } from './components/SkeletonCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { EmptyState } from './components/EmptyState';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { fetchContent } from './services/api';
import type { Content } from './types';

function App() {
  const [type, setType] = useState<'movie' | 'tv'>('movie');
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [contents, setContents] = useState<Content[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger le contenu
  const loadContent = useCallback(
    async (pageToLoad: number, resetContent = false) => {
      if (isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const newContent = await fetchContent({
          type,
          page: pageToLoad,
          platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
          country: selectedCountry || undefined,
        });

        if (newContent.length === 0) {
          setHasMore(false);
        } else {
          setContents(prev => (resetContent ? newContent : [...prev, ...newContent]));
          setHasMore(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        console.error('Erreur lors du chargement:', err);
      } finally {
        setIsLoading(false);
        setIsInitialLoading(false);
      }
    },
    [type, selectedPlatforms, selectedCountry, isLoading]
  );

  // Charger les 3 premières pages au démarrage
  useEffect(() => {
    const loadInitialPages = async () => {
      setIsInitialLoading(true);
      setContents([]);
      setPage(1);
      setHasMore(true);

      try {
        const pages = await Promise.all([
          fetchContent({
            type,
            page: 1,
            platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
            country: selectedCountry || undefined,
          }),
          fetchContent({
            type,
            page: 2,
            platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
            country: selectedCountry || undefined,
          }),
          fetchContent({
            type,
            page: 3,
            platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
            country: selectedCountry || undefined,
          }),
        ]);

        const allContent = pages.flat();
        setContents(allContent);
        setPage(4);
        setHasMore(allContent.length > 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        console.error('Erreur lors du chargement initial:', err);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadInitialPages();
  }, [type, selectedPlatforms, selectedCountry]);

  // Charger plus de contenu (infinite scroll)
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      loadContent(page, false);
      setPage(prev => prev + 1);
    }
  }, [page, isLoading, hasMore, loadContent]);

  const loadMoreRef = useInfiniteScroll({
    onLoadMore: loadMore,
    isLoading,
    hasMore,
  });

  return (
    <div className="min-h-screen bg-base-100 py-6">
      <main className="container mx-auto px-4">
        {/* Filtres */}
        <Filters
          type={type}
          selectedPlatforms={selectedPlatforms}
          selectedCountry={selectedCountry}
          onTypeChange={setType}
          onPlatformsChange={setSelectedPlatforms}
          onCountryChange={setSelectedCountry}
        />

        {/* Erreur */}
        {error && (
          <div className="alert alert-error mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Contenu */}
        {selectedPlatforms.length === 0 ? (
          <EmptyState />
        ) : isInitialLoading ? (
          <SkeletonGrid />
        ) : (
          <>
            <ContentGrid contents={contents} />
            
            {/* Zone de détection pour l'infinite scroll */}
            <div ref={loadMoreRef} className="h-20">
              {isLoading && <LoadingSpinner />}
            </div>

            {!hasMore && contents.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Vous avez tout vu ! 🎬</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App

