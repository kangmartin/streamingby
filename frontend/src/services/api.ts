import type { Content } from '../types';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export interface FetchContentParams {
  type: 'movie' | 'tv';
  page: number;
  platforms?: number[];
  country?: string;
}

export const fetchContent = async ({
  type,
  page,
  platforms,
  country,
}: FetchContentParams): Promise<Content[]> => {
  const params = new URLSearchParams({
    type,
    page: page.toString(),
  });

  if (platforms && platforms.length > 0) {
    params.append('onlyThisProvider', platforms.join(','));
  }

  if (country && country !== '') {
    params.append('country', country);
  }

  const response = await fetch(`${API_URL}/popular?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Erreur lors du chargement du contenu');
  }

  return response.json();
};
