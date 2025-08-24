import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useBoundStore } from "../../store";

export const ProductPurchase = ({ product }) => {
  const addToCart = useBoundStore((store) => store.addToCart);
  const handleAddToCart = () => {
    addToCart(product.documentId, 1);
    console.log("Purchase: ", {
      id: product.documentId,
      quantity: 1,
    });
  };
  return (
    <div className="flex items-center justify-between gap-[15px] pt-[15px] font-semibold text-[var(--c-green-500)]">
      <b className="text-xl font-semibold">${product.final_price}</b>
      <button
        onClick={handleAddToCart}
        className="z-10 flex items-center justify-center gap-[5px] py-[12px] px-[20px] rounded-[4px] bg-[var(--c-green-100)] hover:bg-[var(--c-green-400)] hover:text-white cursor-pointer"
      >
        <ShoppingCartIcon className="size-5" />
        Add
      </button>
    </div>
  );
};
