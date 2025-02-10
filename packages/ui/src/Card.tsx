import ZoomableImage from "./ZoomableImage";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  price: number | undefined;
  priority?: boolean;
}

export default function Card({
  title,
  description,
  imageUrl,
  category,
  price,
  priority,
}: CardProps) {
  return (
    <div className="ui-max-w-sm ui-rounded-lg ui-overflow-hidden ui-shadow-md ui-bg-white">
      <ZoomableImage
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="ui-rounded-t-lg ui-object-cover"
        quality={75}
        priority={priority}
        fill
      />
      <div className="ui-px-6 ui-py-4">
        <div className="ui-font-bold ui-text-xl ui-mb-2">{title}</div>
        <p className="ui-text-gray-700 ui-text-base ui-mb-2">{description}</p>
        <span className="ui-inline-block ui-bg-gray-200 ui-rounded-full ui-px-3 ui-py-1 ui-text-sm ui-font-semibold ui-text-gray-700 ui-mr-2">
          {category}
        </span>
      </div>
      <div className="ui-px-6 ui-pt-4 ui-pb-6">
        <span className="ui-text-xl ui-font-bold ui-text-gray-900">
          {price != null ? `$${price.toFixed(2)}` : "Price not available"}
        </span>
      </div>
    </div>
  );
}
