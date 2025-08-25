import { lazy, Suspense } from "react";
// import { Skeleton } from "../components/Skeleton";
import Section from "./Section";
import { Product } from "./product/Product";

const CardGrid = lazy(() => import("./CardGrid"));
const PopularProducts = lazy(() => import("./PopularProducts"));
const ProductGrid = lazy(() => import("./product/ProductGrid"));

const BLOCK_COMPONENTS = {
  "blocks.category-card": CardGrid,
  "sections.section-content": CardGrid,
  "blocks.category-tabs": PopularProducts,
  "sections.section-category": ProductGrid,
};

export const PageBuilder = ({ pageData }) => {
  if (!pageData) {
    return <div className="text-center py-8">No content available</div>;
  }

  console.log("page builder pagedata", pageData);

  const blocks = pageData.map((blockType) => {
    let Component = BLOCK_COMPONENTS[blockType.__component];

    if (!Component) return null;

    let blockData = null;
    let sectionHeading = null;

    switch (blockType.__component) {
      // case "blocks.category-card": {
      //   sectionHeading = { section_heading: blockType.heading };

      //   blockData = {
      //     card_items: blockType.category.children,
      //   };
      //   break;
      // }

      case "sections.section-content": {
        sectionHeading = { section_heading: blockType.name };

        blockData = {
          card_items: blockType.content_categories[0].content_items,
        };
        break;
      }

      // case "blocks.category-tabs": {
      //   sectionHeading = {
      //     section_heading: blockType.heading,
      //     section_description: blockType.description,
      //   };

      //   blockData = {
      //     products: blockType.category.products,
      //   };
      //   break;
      // }

      case "sections.section-category": {
        sectionHeading = {
          section_heading: blockType.section_heading,
          section_description: blockType.section_description,
        };
        // console.log("blockType.__component====> ", blockType);
        if (blockType.section_type === "block") {
          blockData = {
            products: blockType.section_categories[0].products,
            renderContent: (product) => (
              <Product product={product} key={product.documentId} />
            ),
          };
        } else if (blockType.section_type === "tabs") {
          Component = PopularProducts;
          // console.log("Component = PopularProducts: ", Component);
          blockData = {
            products: blockType.section_categories[0].products,
          };
        } else if (blockType.section_type === "card") {
          Component = CardGrid;
          // sectionHeading = { section_heading: blockType.section_heading };

          // console.log(
          //   "FEATURED  blockType.section_categories[0].products: ",
          //   blockType.section_categories[0].children
          // );

          blockData = {
            card_items: blockType.section_categories[0].children,
          };
        }

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
