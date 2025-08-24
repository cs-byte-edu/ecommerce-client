import { NavigationMenu } from "radix-ui";
import "./style.css";
import { Link } from "react-router";

const nav = {
  id: 9,
  documentId: "g1qroe354vo831pof4rq7spq",
  title: "Categories",
  menuAttached: true,
  order: 1,
  path: "/categories",
  type: "WRAPPER",
  uiRouterKey: "categories",
  slug: "categories-1",
  items: [
    {
      id: 10,
      documentId: "qtgwcreyd8s9pscfbpdfldeg",
      title: "Protein",
      menuAttached: true,
      order: 1,
      path: "/categories/protein",
      type: "WRAPPER",
      uiRouterKey: "protein",
      slug: "categories-protein",
      items: [
        {
          id: 15,
          documentId: "b7bb6h954d9z1gjxqqremqbu",
          title: "Casein",
          menuAttached: true,
          order: 1,
          path: "/categories/protein/casein",
          type: "INTERNAL",
          uiRouterKey: "casein",
          slug: "categories-protein-casein",
          related: {
            documentId: "jrvvsqolwjjlyl7rm09rd4y0",
            __type: "api::category.category",
            name: "Casein",
            slug: "casein",
            description: null,
            short_description: null,
            is_active: true,
            sort_order: 0,
            seo_title: null,
            seo_description: null,
            type: "product",
          },
          items: [],
          collapsed: false,
          additionalFields: {},
        },
        {
          id: 16,
          documentId: "fry6m1a0h00x1n9npe85vxqq",
          title: "Whey Protein",
          menuAttached: true,
          order: 2,
          path: "/categories/protein/whey-protein",
          type: "INTERNAL",
          uiRouterKey: "whey-protein",
          slug: "categories-protein-whey-protein",
          related: {
            documentId: "y8fct2zmlz98q83tf9abm6i0",
            __type: "api::category.category",
            name: "Whey Protein",
            slug: "whey-protein",
            description: null,
            short_description: null,
            is_active: true,
            sort_order: 0,
            seo_title: null,
            seo_description: null,
            type: "product",
          },
          items: [],
          collapsed: false,
          additionalFields: {},
        },
        {
          id: 18,
          documentId: "k9jzf64ngemcgzid15q8tzs2",
          title: "Complex protein",
          menuAttached: true,
          order: 3,
          path: "/categories/protein/complex-protein",
          type: "INTERNAL",
          uiRouterKey: "complex-protein",
          slug: "categories-protein-complex-protein",
          related: {
            documentId: "rs60h50igyjyyuealp5wxm3x",
            __type: "api::category.category",
            name: "Complex protein",
            slug: "complex-protein",
            description: null,
            short_description: null,
            is_active: true,
            sort_order: 0,
            seo_title: null,
            seo_description: null,
            type: "product",
          },
          items: [],
          collapsed: false,
          additionalFields: {},
        },
      ],
      collapsed: false,
      additionalFields: {},
    },
    {
      id: 23,
      documentId: "ucvedzhnx1vxrhx66bc0xed1",
      title: "Gainer",
      menuAttached: true,
      order: 2,
      path: "/categories/gainers",
      type: "INTERNAL",
      uiRouterKey: "gainer-1",
      slug: "categories-gainers",
      related: {
        documentId: "afcau2afzbx12rmsph2ef7h8",
        __type: "api::category.category",
        name: "Gainer",
        slug: "gainer",
        description: null,
        short_description: null,
        is_active: true,
        sort_order: 0,
        seo_title: null,
        seo_description: null,
        type: "product",
      },
      items: [],
      collapsed: false,
      additionalFields: {},
    },
    {
      id: 24,
      documentId: "tmwd23hhj0dr6m3si1hqakyt",
      title: "Amino acids",
      menuAttached: true,
      order: 3,
      path: "/categories/amino-acids",
      type: "INTERNAL",
      uiRouterKey: "amino-acids",
      slug: "categories-amino-acids",
      related: {
        documentId: "jesy8a6q9s0vp6583yseai4o",
        __type: "api::category.category",
        name: "Amino acids",
        slug: "amino-acids",
        description: null,
        short_description: null,
        is_active: true,
        sort_order: 0,
        seo_title: null,
        seo_description: null,
        type: "product",
      },
      items: [],
      collapsed: false,
      additionalFields: {},
    },
    {
      id: 25,
      documentId: "chg5csd65riw1jlbbq5nndhe",
      title: "Creatine",
      menuAttached: true,
      order: 4,
      path: "/categories/creatine",
      type: "INTERNAL",
      uiRouterKey: "creatine",
      slug: "categories-creatine",
      related: {
        documentId: "id111b9xazz1rb9ubiguhgat",
        __type: "api::category.category",
        name: "Creatine",
        slug: "creatine",
        description: null,
        short_description: null,
        is_active: true,
        sort_order: 0,
        seo_title: null,
        seo_description: null,
        type: "product",
      },
      items: [],
      collapsed: false,
      additionalFields: {},
    },
  ],
  collapsed: false,
  additionalFields: {},
};

export const NavigationItem = ({ item, isSubMenu = false }) => {
  if (!item.menuAttached) return null;

  const hasChildren = item.items?.length > 0;
  const isInternal = item.type === "INTERNAL";

  const renderMenuContent = () => {
    const childItems = item.items
      .filter((child) => child.menuAttached)
      .sort((a, b) => a.order - b.order)
      .map((child) => <NavigationItem key={child.id} item={child} isSubMenu />);

    if (isSubMenu) {
      // Для субменю контент всередині NavigationMenu.Sub
      return (
        <NavigationMenu.Sub>
          <NavigationMenu.List className="NavigationMenuList">
            {childItems}
          </NavigationMenu.List>
        </NavigationMenu.Sub>
      );
    } else {
      // Для першого рівня перевіряємо чи є у дітей свої діти
      const hasNestedChildren = item.items.some(
        (child) => child.items && child.items.length > 0
      );

      if (hasNestedChildren) {
        return (
          <NavigationMenu.Sub>
            <NavigationMenu.List className="NavigationMenuList">
              {childItems}
            </NavigationMenu.List>
          </NavigationMenu.Sub>
        );
      } else {
        return (
          <NavigationMenu.List className="NavigationMenuList">
            {childItems}
          </NavigationMenu.List>
        );
      }
    }
  };

  return (
    <NavigationMenu.Item
      className={`NavigationMenuItem ${
        !isSubMenu ? "NavigationMenuItem_root" : ""
      }`}
      value={item.uiRouterKey || item.slug}
    >
      {hasChildren ? (
        <>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            {item.title}
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            {renderMenuContent()}
          </NavigationMenu.Content>
        </>
      ) : isInternal && item.path ? (
        <NavigationMenu.Link asChild>
          <Link to={item.path} className="NavigationMenuLink">
            {item.title}
          </Link>
        </NavigationMenu.Link>
      ) : (
        <NavigationMenu.Link className="NavigationMenuLink">
          {item.title}
        </NavigationMenu.Link>
      )}
    </NavigationMenu.Item>
  );
};

// Основний компонент Navigation
export const Navigation = ({ menuData }) => {
  if (!menuData || !Array.isArray(menuData) || menuData.length === 0) {
    return null;
  }

  return (
    <NavigationMenu.Root
      className="NavigationMenuRoot NavigationMenu NavigationMenu_categories"
      delayDuration={200}
      skipDelayDuration={300}
    >
      <NavigationMenu.List className="NavigationMenuList">
        {menuData
          .filter((item) => item.menuAttached)
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <NavigationItem key={item.id} item={item} isSubMenu={false} />
          ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
