import { useEffect, useCallback, useRef } from "react";
import { NavigationMenu } from "radix-ui";
import { Link } from "react-router";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import "./style.css";
/* {
    "id": 9,
    "documentId": "g1qroe354vo831pof4rq7spq",
    "title": "Categories",
    "menuAttached": true,
    "order": 1,
    "path": "/categories",
    "type": "WRAPPER",
    "uiRouterKey": "categories",
    "slug": "categories-1",
    "items": [
        {
            "id": 10,
            "documentId": "qtgwcreyd8s9pscfbpdfldeg",
            "title": "Protein",
            "menuAttached": true,
            "order": 1,
            "path": "/categories/protein",
            "type": "WRAPPER",
            "uiRouterKey": "protein",
            "slug": "categories-protein",
            "items": [
                {
                    "id": 15,
                    "documentId": "b7bb6h954d9z1gjxqqremqbu",
                    "title": "Casein",
                    "menuAttached": true,
                    "order": 1,
                    "path": "/categories/protein/casein",
                    "type": "INTERNAL",
                    "uiRouterKey": "casein",
                    "slug": "categories-protein-casein",
                    "related": {
                        "documentId": "jrvvsqolwjjlyl7rm09rd4y0",
                        "__type": "api::category.category",
                        "name": "Casein",
                        "slug": "casein",
                        "description": null,
                        "short_description": null,
                        "is_active": true,
                        "sort_order": 0,
                        "seo_title": null,
                        "seo_description": null,
                        "type": "product"
                    },
                    "items": [],
                    "collapsed": false,
                    "additionalFields": {}
                },
                {
                    "id": 16,
                    "documentId": "fry6m1a0h00x1n9npe85vxqq",
                    "title": "Whey Protein",
                    "menuAttached": true,
                    "order": 2,
                    "path": "/categories/protein/whey-protein",
                    "type": "INTERNAL",
                    "uiRouterKey": "whey-protein",
                    "slug": "categories-protein-whey-protein",
                    "related": {
                        "documentId": "y8fct2zmlz98q83tf9abm6i0",
                        "__type": "api::category.category",
                        "name": "Whey Protein",
                        "slug": "whey-protein",
                        "description": null,
                        "short_description": null,
                        "is_active": true,
                        "sort_order": 0,
                        "seo_title": null,
                        "seo_description": null,
                        "type": "product"
                    },
                    "items": [],
                    "collapsed": false,
                    "additionalFields": {}
                },
                {
                    "id": 18,
                    "documentId": "k9jzf64ngemcgzid15q8tzs2",
                    "title": "Complex protein",
                    "menuAttached": true,
                    "order": 3,
                    "path": "/categories/protein/complex-protein",
                    "type": "INTERNAL",
                    "uiRouterKey": "complex-protein",
                    "slug": "categories-protein-complex-protein",
                    "related": {
                        "documentId": "rs60h50igyjyyuealp5wxm3x",
                        "__type": "api::category.category",
                        "name": "Complex protein",
                        "slug": "complex-protein",
                        "description": null,
                        "short_description": null,
                        "is_active": true,
                        "sort_order": 0,
                        "seo_title": null,
                        "seo_description": null,
                        "type": "product"
                    },
                    "items": [],
                    "collapsed": false,
                    "additionalFields": {}
                }
            ],
            "collapsed": false,
            "additionalFields": {}
        },
        {
            "id": 23,
            "documentId": "ucvedzhnx1vxrhx66bc0xed1",
            "title": "Gainer",
            "menuAttached": true,
            "order": 2,
            "path": "/categories/gainers",
            "type": "INTERNAL",
            "uiRouterKey": "gainer-1",
            "slug": "categories-gainers",
            "related": {
                "documentId": "afcau2afzbx12rmsph2ef7h8",
                "__type": "api::category.category",
                "name": "Gainer",
                "slug": "gainer",
                "description": null,
                "short_description": null,
                "is_active": true,
                "sort_order": 0,
                "seo_title": null,
                "seo_description": null,
                "type": "product"
            },
            "items": [],
            "collapsed": false,
            "additionalFields": {}
        },
        {
            "id": 24,
            "documentId": "tmwd23hhj0dr6m3si1hqakyt",
            "title": "Amino acids",
            "menuAttached": true,
            "order": 3,
            "path": "/categories/amino-acids",
            "type": "INTERNAL",
            "uiRouterKey": "amino-acids",
            "slug": "categories-amino-acids",
            "related": {
                "documentId": "jesy8a6q9s0vp6583yseai4o",
                "__type": "api::category.category",
                "name": "Amino acids",
                "slug": "amino-acids",
                "description": null,
                "short_description": null,
                "is_active": true,
                "sort_order": 0,
                "seo_title": null,
                "seo_description": null,
                "type": "product"
            },
            "items": [],
            "collapsed": false,
            "additionalFields": {}
        },
        {
            "id": 25,
            "documentId": "chg5csd65riw1jlbbq5nndhe",
            "title": "Creatine",
            "menuAttached": true,
            "order": 4,
            "path": "/categories/creatine",
            "type": "INTERNAL",
            "uiRouterKey": "creatine",
            "slug": "categories-creatine",
            "related": {
                "documentId": "id111b9xazz1rb9ubiguhgat",
                "__type": "api::category.category",
                "name": "Creatine",
                "slug": "creatine",
                "description": null,
                "short_description": null,
                "is_active": true,
                "sort_order": 0,
                "seo_title": null,
                "seo_description": null,
                "type": "product"
            },
            "items": [],
            "collapsed": false,
            "additionalFields": {}
        }
    ],
    "collapsed": false,
    "additionalFields": {}
} */

export const CategoriesMenu = ({ menuData }) => {
  const headerRef = useRef(null);

  // Функція для оновлення позиції мега-меню
  const updateMegaMenuPosition = useCallback(() => {
    const header = headerRef.current || document.querySelector(".header");

    if (header) {
      const headerRect = header.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const headerBottom = headerRect.bottom + scrollTop;

      document.documentElement.style.setProperty(
        "--header-height",
        `${headerBottom}px`
      );
    }
  }, []);

  useEffect(() => {
    // Оновлення позиції при монтуванні
    updateMegaMenuPosition();

    // ResizeObserver для відслідковування змін розміру хедера
    let resizeObserver;
    const header =
      headerRef.current ||
      document.querySelector('.header, .navbar, [role="banner"]');

    if (header && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(updateMegaMenuPosition);
      resizeObserver.observe(header);
    }

    window.addEventListener("resize", updateMegaMenuPosition);
    window.addEventListener("scroll", updateMegaMenuPosition);

    const mutationObserver = new MutationObserver(updateMegaMenuPosition);
    if (header) {
      mutationObserver.observe(header, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      window.removeEventListener("resize", updateMegaMenuPosition);
      window.removeEventListener("scroll", updateMegaMenuPosition);
    };
  }, [updateMegaMenuPosition]);

  const handleMenuOpen = useCallback(() => {
    requestAnimationFrame(updateMegaMenuPosition);
  }, [updateMegaMenuPosition]);

  if (!menuData || !Array.isArray(menuData) || menuData.length === 0) {
    return null;
  }

  return (
    <NavigationMenu.Root
      className="NavigationMenuRoot NavigationMenu_categories"
      delayDuration={200}
      skipDelayDuration={300}
    >
      <NavigationMenu.List className="NavigationMenuList">
        {menuData
          .filter((item) => item.menuAttached)
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <CategoriesMenuItem
              key={item.documentId}
              item={item}
              onPointerEnter={handleMenuOpen}
            />
          ))}
      </NavigationMenu.List>
      <NavigationMenu.Indicator className="NavigationMenuIndicator" />
    </NavigationMenu.Root>
  );
};

export const CategoriesMenuItem = ({ item, onPointerEnter }) => {
  const isRootMenuItem = item.path?.split("/").length - 1 < 2;

  return (
    <>
      {isRootMenuItem ? (
        <NavigationMenu.Item
          className="NavigationMenuItem"
          value={item.uiRouterKey}
        >
          <NavigationMenu.Trigger
            className="NavigationMenuTrigger"
            onPointerEnter={onPointerEnter}
          >
            <Squares2X2Icon className="size-8" />
            {item.title}
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent NavigationMenuContent_categories">
            {item.items.map((listItem) => (
              <CategoriesMenuItem key={listItem.title} item={listItem} />
            ))}
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      ) : (
        <div className="category__group">
          <h3 className="category__heading">
            <NavigationMenu.Link asChild>
              <Link to={item.path}>{item.title}</Link>
            </NavigationMenu.Link>
          </h3>
          <ul className="category__list">
            {item.items?.map((listItem) => (
              <li key={listItem.documentId} className="category__list-item">
                <NavigationMenu.Link asChild>
                  <Link to={listItem.path}>{listItem.title}</Link>
                </NavigationMenu.Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
