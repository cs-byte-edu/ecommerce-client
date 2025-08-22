import { ProductInfo } from "./ProductInfo";
import { ProductPurchase } from "./ProductPurchase";

export const ProductCard = ({ product, className = "" }) => {
  return (
    <div
      className={`flex flex-col justify-between h-full px-[15px] py-[20px] border border-[var(--c-gray-200)] rounded-[8px] ${className}`}
    >
      <ProductInfo product={product} />
      <ProductPurchase product={product} />
    </div>
  );
};
