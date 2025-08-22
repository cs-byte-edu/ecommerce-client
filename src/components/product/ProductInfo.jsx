const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProductInfo = ({ product }) => {
  // console.log("product info: ", product);
  return (
    <div className="pt-[16px]">
      <img
        src={`${BASE_URL}${product?.image?.url}`}
        alt={`${product?.image?.alternativeText}`}
        className="h-[200px] object-contain m-auto"
      />

      <h3 className="capitalize text-[.875rem] text-[var(--c-gray-500)] pt-[12px]">
        {product?.primary_category?.name}
      </h3>
      <h4 className="font-semibold text-xl">{product?.name}</h4>
      <p className="text-[var(--c-gray-500)]">
        By{" "}
        <a href="#" className="text-[var(--c-green-400)]">
          {product?.brand?.name}
        </a>
      </p>
    </div>
  );
};
