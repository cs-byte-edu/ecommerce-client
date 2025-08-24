import { lazy, Suspense } from "react";
// import { Skeleton } from "../components/Skeleton";
import Section from "./Section";
import { Product } from "./product/Product";

const CardGrid = lazy(() => import("./CardGrid"));
const PopularProducts = lazy(() => import("./PopularProducts"));
const ProductGrid = lazy(() => import("./product/ProductGrid"));

const BLOCK_COMPONENTS = {
  "blocks.category-card": CardGrid,
  "layout.section-benefits": CardGrid,
  "blocks.category-tabs": PopularProducts,
  "sections.section-category": ProductGrid,
};

export const PageBuilder = ({ pageData }) => {
  if (!pageData) {
    return <div className="text-center py-8">No content available</div>;
  }

  console.log("page builder pagedata", pageData);

  const blocks = pageData.map((blockType) => {
    const Component = BLOCK_COMPONENTS[blockType.__component];

    if (!Component) return null;

    let blockData = null;
    let sectionHeading = null;

    switch (blockType.__component) {
      case "blocks.category-card": {
        sectionHeading = { section_heading: blockType.heading };

        blockData = {
          card_items: blockType.category.children,
        };
        break;
      }

      case "layout.section-benefits": {
        sectionHeading = { section_heading: blockType.heading };

        blockData = {
          card_items: blockType.benefits,
        };
        break;
      }

      case "blocks.category-tabs": {
        sectionHeading = {
          section_heading: blockType.heading,
          section_description: blockType.description,
        };

        blockData = {
          products: blockType.category.products,
        };
        break;
      }

      case "sections.section-category": {
        sectionHeading = {
          section_heading: blockType.section_heading,
          section_description: blockType.section_description,
        };

        blockData = {
          products: blockType.section_categories[0].products,
          renderContent: (product) => (
            <Product product={product} key={product.documentId} />
          ),
        };
        break;
      }
    }

    return (
      <Suspense key={blockType.id}>
        <Section sectionHeader={sectionHeading}>
          <Component data={blockData} />
        </Section>
      </Suspense>
    );
  });

  return <div className="page-builder">{blocks}</div>;
};
