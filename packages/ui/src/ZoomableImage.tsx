import { useState, useRef, type MouseEvent } from "react";
import Image from "next/image";

interface ZoomableImageProps
  extends React.ComponentPropsWithoutRef<typeof Image> {
  src: string;
  alt: string;
}

export default function ZoomableImage({
  src,
  alt,
  className,
  ...rest
}: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, top, width, height } =
        imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setPosition({ x, y });
    }
  };

  return (
    <div
      className="ui-relative ui-h-64 ui-w-full ui-overflow-hidden ui-rounded-t-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={imageRef}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`ui-transition-transform ui-duration-200 ui-ease-out ${isZoomed ? "ui-scale-150" : "ui-scale-100"} ${className ?? ""}`}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
        {...rest}
      />
    </div>
  );
}
