export interface Platform {
  id: number;
  name: string;
  icon: string;
}

export const PLATFORMS: Platform[] = [
  { id: 8, name: 'Netflix', icon: '🇳' },
  { id: 337, name: 'Disney+', icon: '🇩' },
  { id: 119, name: 'Prime Video', icon: '🇵' },
];

// Mapping des codes TMDB pour les plateformes
export const PLATFORM_IDS = {
  NETFLIX: 8,
  DISNEY_PLUS: 337,
  PRIME_VIDEO: 119,
};
