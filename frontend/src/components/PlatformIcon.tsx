interface PlatformIconProps {
  platformId: number;
  size?: 'sm' | 'md' | 'lg';
}

const platformLogos: Record<number, string> = {
  8: 'https://image.tmdb.org/t/p/original/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg', // Netflix
  337: 'https://image.tmdb.org/t/p/original/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg', // Disney+
  119: 'https://image.tmdb.org/t/p/original/emthp39XA2YScoYL1p0sdbAH2WA.jpg', // Prime Video
  384: 'https://image.tmdb.org/t/p/original/Ajqyt5aNxNGjmF9uOfxArGrdf3X.jpg', // HBO Max
  350: 'https://image.tmdb.org/t/p/original/6uhKBfmtzFqOcLousHwZuzcrScK.jpg', // Apple TV+
};

const platformNames: Record<number, string> = {
  8: 'Netflix',
  337: 'Disney+',
  119: 'Prime Video',
  384: 'HBO Max',
  350: 'Apple TV+',
};

export const PlatformIcon = ({ platformId, size = 'md' }: PlatformIconProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const logo = platformLogos[platformId];
  const name = platformNames[platformId];

  if (!logo) return null;

  return (
    <img
      src={logo}
      alt={name}
      className={`${sizeClasses[size]} rounded-lg object-contain`}
      title={name}
    />
  );
};
