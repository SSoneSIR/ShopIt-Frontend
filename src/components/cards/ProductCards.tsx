import { Star, Plus } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  rating: number;
  weight: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  category: string;
  onAddToCart: (event?: React.MouseEvent) => void;
  onClick?: () => void;
}

const ProductCard = ({
  name,
  image,
  rating,
  weight,
  price,
  originalPrice,
  discount,
  onAddToCart,
  onClick,
}: ProductCardProps & { onClick?: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="rounded-3xl p-4 relative group hover:shadow-lg transition-shadow bg-white"
    >
      {discount && (
        <span className="absolute top-0 left-0 bg-red-500 text-white text-sm px-4 py-2 rounded-tl-3xl rounded-br-3xl font-semibold z-10">
          {discount}
        </span>
      )}
      <div className="h-28 flex items-center justify-center mb-3 bg-white rounded-lg">
        <img
          src={image}
          alt={name}
          className="h-full object-contain cursor-pointer"
          loading="lazy"
          width="100"
          height="100"
        />
      </div>
      <h4 className="text-foreground cursor-pointer font-medium text-sm line-clamp-2 min-h-[40px]">
        {name}
      </h4>
      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{rating}</span>
        </div>
        <span>•</span>
        <span>{weight}</span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div>
          {originalPrice && (
            <span className="text-destructive text-xs line-through block">
              Rs. {originalPrice}
            </span>
          )}
          <span className="text-foreground font-bold">Rs. {price}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(e);
          }}
          className="w-8 h-8 bg-green-600 cursor-pointer hover:bg-green-200 text-white rounded-full flex items-center justify-center transition-colors"
        >
          <Plus className="w-5 h-5" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
