import { useRef, useEffect } from "react";

type ImageProps = {
  className: string;
  src: string | undefined;
  alt: string | undefined;
};

const Image = ({ className, src, alt }: ImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (imgRef.current) {
            imgRef.current.src = src || "";
            observer.unobserve(imgRef.current);
          }
        }
      });
    }, options);

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return <img ref={imgRef} src={""} alt={alt ?? ""} className={className} />;
};

export default Image;
