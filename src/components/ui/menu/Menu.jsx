import { Menubar } from "radix-ui";
import { MenuItem } from "./MenuItem";

export const Menu = ({ navItems }) => {
  const items = Array.isArray(navItems) ? navItems : [];
  return (
    <Menubar.Root className="flex items-center justify-between">
      <Menubar.Menu>
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </Menubar.Menu>
    </Menubar.Root>
  );
};
