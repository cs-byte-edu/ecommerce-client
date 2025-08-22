import {
  HeartIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { ProductCard } from "./ProductCard";
import { ProductOverlay } from "./ProductOverlay";

export const Product = ({ product }) => {
  return (
    <div className="relative group/product">
      <ProductCard product={product} />
      <ProductOverlay>
        <div className="text-sm mb-[8px]">
          <span className="text-green-500">SKU:</span> {product.sku}
        </div>
        <Link
          to="/wishlist"
          onClick={() => {}}
          className="bg-white py-[8px] hover:bg-[var(--c-green-400)] px-[12px] border border-[var(--c-green-500)] rounded-[3px] cursor-pointer group/action"
        >
          <HeartIcon className="size-5 text-[var(--c-green-500)] group-hover/action:text-white" />
        </Link>
        <Link
          to="/compare"
          onClick={() => {}}
          className="bg-white hover:bg-[var(--c-green-400)] py-[8px] px-[12px] border border-[var(--c-green-500)] rounded-[3px] cursor-pointer group/action"
        >
          <ArrowPathRoundedSquareIcon className="size-5 text-[var(--c-green-500)] group-hover/action:text-white" />
        </Link>
      </ProductOverlay>
    </div>
  );
};
