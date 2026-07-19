import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  boardId: string;
  tim: number;
  ext: string;
  className?: string;
}

export default function VideoPlayer({
  boardId,
  tim,
  ext,
  className = "w-full h-auto max-h-[500px] object-contain",
}: VideoPlayerProps) {
  // Full proxy endpoint; defaults to the local /api/proxy server route.
  const proxyEndpoint = import.meta.env.VITE_PROXY_URL || "/api/proxy";
  const videoUrl = `${proxyEndpoint}?url=https://i.4cdn.org/${boardId}/${tim}${ext}`;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="mt-2 rounded-md overflow-hidden">
      <video
        ref={videoRef}
        src={isInView ? videoUrl : undefined}
        controls
        className={className}
        preload={isInView ? "metadata" : "none"}
      />
    </div>
  );
}
