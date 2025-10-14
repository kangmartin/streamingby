import type { Content } from '../types';
import { ContentCard } from './ContentCard';

interface ContentGridProps {
  contents: Content[];
}

export const ContentGrid = ({ contents }: ContentGridProps) => {
  if (contents.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-500">
          Aucun contenu trouvé pour ces critères
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {contents.map(content => (
        <ContentCard key={`${content.id}-${Math.random()}`} content={content} />
      ))}
    </div>
  );
};
