import { PLATFORMS } from '../constants/platforms';
import { COUNTRIES } from '../constants/countries';
import { PlatformIcon } from './PlatformIcon';

interface FiltersProps {
  type: 'movie' | 'tv';
  selectedPlatforms: number[];
  selectedCountry: string;
  onTypeChange: (type: 'movie' | 'tv') => void;
  onPlatformsChange: (platforms: number[]) => void;
  onCountryChange: (country: string) => void;
}

export const Filters = ({
  type,
  selectedPlatforms,
  selectedCountry,
  onTypeChange,
  onPlatformsChange,
  onCountryChange,
}: FiltersProps) => {
  const togglePlatform = (platformId: number) => {
    if (selectedPlatforms.includes(platformId)) {
      onPlatformsChange(selectedPlatforms.filter(id => id !== platformId));
    } else {
      onPlatformsChange([...selectedPlatforms, platformId]);
    }
  };

  return (
    <div className="bg-base-200 p-6 rounded-xl mb-8">

      
      {/* Type de contenu */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3 text-gray-400">Type de contenu</label>
        <div className="flex gap-3">
          <button
            className={`btn flex-1 ${type === 'movie' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => onTypeChange('movie')}
          >
            Films
          </button>
          <button
            className={`btn flex-1 ${type === 'tv' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => onTypeChange('tv')}
          >
            Séries
          </button>
        </div>
      </div>

      {/* Plateformes */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3 text-gray-400">
          Plateformes de streaming
        </label>
        <div className="grid grid-cols-3 gap-3">
          {PLATFORMS.map(platform => (
            <button
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={`btn ${
                selectedPlatforms.includes(platform.id)
                  ? 'btn-primary'
                  : 'btn-ghost'
              } flex flex-col gap-2 h-auto py-4 transition-colors duration-200`}
            >
              <PlatformIcon platformId={platform.id} size="md" />
              <span className="text-xs font-medium">{platform.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pays */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-gray-400">
          Disponible partout SAUF
        </label>
        <select
          className="select select-ghost w-full bg-base-300"
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          disabled={selectedPlatforms.length === 0}
        >
          <option value="">Aucun pays exclu</option>
          {COUNTRIES.map(country => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.name}
            </option>
          ))}
        </select>
        {selectedPlatforms.length === 0 ? (
          <p className="text-xs text-gray-500 mt-2">
            Sélectionnez d'abord une plateforme
          </p>
        ) : (
          <p className="text-xs text-info mt-2">
           
          </p>
        )}
      </div>
    </div>
  );
};
