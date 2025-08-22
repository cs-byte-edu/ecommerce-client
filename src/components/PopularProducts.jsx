import { TabsSection } from "./ui/tabs/tabs";
import { ProductCard } from "./product/ProductCard";
import ProductGrid from "./product/ProductGrid";
import { memo } from "react";

const PopularProducts = memo(({ data }) => {
  const tabs = data?.products?.reduce((acc, curr) => {
    const mainCategory = curr?.primary_category?.name;

    return !acc[mainCategory]
      ? ((acc[mainCategory] = []), acc[mainCategory].push(curr), acc)
      : (acc[mainCategory].push(curr), acc);
  }, {});

  const tabsTriggers = Object.keys(tabs);

  const tabsContent = Object.values(tabs).map((contentItem) => {
    return (
      <ProductGrid
        key={contentItem.documentId}
        className="popular-products__grid"
        data={{
          products: contentItem,
          renderContent: (item) => (
            <ProductCard
              key={item.documentId}
              product={item}
              className="popular-products__card"
            />
          ),
        }}
      />
    );
  });

  return <TabsSection tabsTriggers={tabsTriggers} tabsContent={tabsContent} />;
});

export default PopularProducts;
