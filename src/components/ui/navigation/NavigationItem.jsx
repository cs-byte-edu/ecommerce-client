import { NavigationMenu } from "radix-ui";
import { Link } from "react-router";

export const NavigationItem = ({ item, isSubMenu = false }) => {
  if (!item.menuAttached) return null;

  const hasChildren = item.items?.length > 0;
  const isInternal = item.type === "INTERNAL";

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
            {isSubMenu ? (
              // Для вкладених рівнів використовуємо Sub
              <NavigationMenu.Sub>
                <NavigationMenu.List className="NavigationMenuList">
                  {item.items
                    .filter((child) => child.menuAttached)
                    .sort((a, b) => a.order - b.order)
                    .map((child) => (
                      <NavigationItem key={child.id} item={child} isSubMenu />
                    ))}
                </NavigationMenu.List>
              </NavigationMenu.Sub>
            ) : (
              // Для першого рівня просто список
              <NavigationMenu.List className="NavigationMenuList">
                {item.items
                  .filter((child) => child.menuAttached)
                  .sort((a, b) => a.order - b.order)
                  .map((child) => (
                    <NavigationItem key={child.id} item={child} isSubMenu />
                  ))}
              </NavigationMenu.List>
            )}
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
