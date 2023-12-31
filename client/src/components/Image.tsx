type ImageProps = {
  className: string;
  src: string | undefined;
  alt: string | undefined;
};

const Image = ({ className, src, alt }: ImageProps) => {
  return <img loading="lazy" src={src} alt={alt ?? ""} className={className} />;
};

export default Image;
