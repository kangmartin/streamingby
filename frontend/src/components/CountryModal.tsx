import { getCountryByCode } from '../constants/countries';
import { PlatformIcon } from './PlatformIcon';
import type { Provider } from '../types';

interface CountryModalProps {
  isOpen: boolean;
  onClose: () => void;
  providers: Provider[];
  contentName: string;
}

export const CountryModal = ({ isOpen, onClose, providers, contentName }: CountryModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-base-200 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-base-300">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold">{contentName}</h3>
                <p className="text-sm text-gray-400 mt-1">Disponibilité par plateforme</p>
              </div>
              <button 
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 space-y-6">
            {providers.map(provider => (
              <div key={provider.id} className="bg-base-300 rounded-lg p-4">
                {/* Platform Header */}
                <div className="flex items-center gap-3 mb-4">
                  <PlatformIcon platformId={provider.id} size="md" />
                  <div>
                    <h4 className="font-bold text-lg">{provider.name}</h4>
                    <p className="text-xs text-gray-400">
                      {provider.countries.length} pays
                    </p>
                  </div>
                </div>

                {/* Countries Grid */}
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {provider.countries.map(countryCode => {
                    const country = getCountryByCode(countryCode);
                    return country ? (
                      <div 
                        key={countryCode}
                        className="flex flex-col items-center gap-1 p-2 bg-base-100 rounded-lg hover:bg-base-200 transition-colors"
                      >
                        <span className="text-3xl">{country.flag}</span>
                        <span className="text-[10px] text-center leading-tight text-gray-400">
                          {country.name}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
