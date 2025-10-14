import { useState } from 'react';
import type { Content } from '../types';
import { getCountryByCode } from '../constants/countries';
import { PlatformIcon } from './PlatformIcon';
import { CountryModal } from './CountryModal';

interface ContentCardProps {
  content: Content;
}

export const ContentCard = ({ content }: ContentCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const posterUrl = content.poster_path
    ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
    : 'https://via.placeholder.com/500x750/1a1a1a/666666?text=No+Image';

  return (
    <>
      <div className="card bg-base-100 hover:bg-base-200 transition-all duration-300">
        <figure className="aspect-[2/3] overflow-hidden bg-base-300">
          <img
            src={posterUrl}
            alt={content.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </figure>
        <div className="card-body p-4">
          <h3 className="card-title text-base line-clamp-2 min-h-[3rem]">{content.name}</h3>
          
          {/* Plateformes disponibles */}
          {content.providers && content.providers.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {content.providers.map(provider => (
                <PlatformIcon
                  key={provider.id}
                  platformId={provider.id}
                  size="sm"
                />
              ))}
            </div>
          )}

          {/* Aperçu pays avec drapeaux plus gros */}
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-400 mb-2">
              Disponible dans {content.availableCountries.length} pays
            </p>
            <div className="flex flex-wrap gap-2">
              {content.availableCountries.slice(0, 12).map(countryCode => {
                const country = getCountryByCode(countryCode);
                return country ? (
                  <div key={countryCode} className="tooltip tooltip-top" data-tip={country.name}>
                    <span className="text-2xl cursor-default">
                      {country.flag}
                    </span>
                  </div>
                ) : null;
              })}
              {content.availableCountries.length > 12 && (
                <span className="badge badge-primary">
                  +{content.availableCountries.length - 12}
                </span>
              )}
            </div>
          </div>

          {/* Bouton voir détails */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary btn-sm mt-3 w-full"
          >
            Voir plus
          </button>
        </div>
      </div>

      {/* Modal */}
      <CountryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        providers={content.providers}
        contentName={content.name}
      />
    </>
  );
};
