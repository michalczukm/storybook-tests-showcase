import type React from "react";
import type { Product } from "../../data/types";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { Image } from "../atoms/Image";
import { Rating } from "../atoms/Rating";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onRatingChange?: (rating: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onRatingChange,
}) => {
  const getStockStatus = (stock: number) => {
    if (stock === 0) return { variant: "error" as const, text: "Out of Stock" };
    if (stock < 5) return { variant: "warning" as const, text: "Low Stock" };
    return { variant: "success" as const, text: "In Stock" };
  };

  const status = getStockStatus(product.stock);

  return (
    <div className="w-72 rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <Image src={product.image} alt={product.name} aspectRatio="4:3" />
        <div className="absolute top-2 right-2">
          <Badge variant={status.variant}>{status.text}</Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <Rating
            value={product.rating}
            onChange={onRatingChange}
            readonly={!onRatingChange}
          />
        </div>

        <Button
          variant="primary"
          disabled={product.stock === 0}
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
