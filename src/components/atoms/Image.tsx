import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  aspectRatio?: "1:1" | "4:3" | "16:9";
  fit?: "cover" | "contain";
  fallback?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  aspectRatio = "1:1",
  fit = "cover",
  fallback = "https://via.placeholder.com/150",
}) => {
  const [error, setError] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const aspectRatioClasses = {
    "1:1": "aspect-square",
    "4:3": "aspect-[4/3]",
    "16:9": "aspect-video",
  };

  return (
    <div
      className={`relative overflow-hidden ${aspectRatioClasses[aspectRatio]}`}
    >
      <img
        src={error ? fallback : src}
        alt={alt}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={`
          w-full h-full transition-opacity duration-300
          ${fit === "cover" ? "object-cover" : "object-contain"}
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};
