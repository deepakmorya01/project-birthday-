import { useState, useEffect } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export function SmartImage({ src, alt, className = '', fallback }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  return (
    <>
      {!loaded && !error && (
        <div className={`absolute inset-0 animate-pulse bg-void-800 ${className}`} />
      )}
      {error && fallback ? (
        <img src={fallback} alt={alt} className={className} loading="lazy" />
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 ease-cinematic`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </>
  );
}
