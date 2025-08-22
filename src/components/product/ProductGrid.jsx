const ProductGrid = ({ data, className = "" }) => {
  return (
    <div
      className={`grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] gap-[20px] ${className}`}
    >
      {data.products.map((product) => data.renderContent(product))}
    </div>
  );
};

export default ProductGrid;
