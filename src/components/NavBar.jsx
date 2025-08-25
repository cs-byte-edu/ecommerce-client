import { Link, useNavigate } from "react-router";
// import {
//   ShoppingCartIcon,
//   HeartIcon,
//   ScaleIcon,
//   UserIcon,
// } from "@heroicons/react/24/outline";
import { Search } from "./Search";
// import { Menu } from "./ui/menu/Menu";
import { Badge } from "./Badge";
// import { useCallback } from "react";
import { useBoundStore } from "../store";

import { CategoriesMenu } from "./ui/categoriesMenu/CategoriesMenu";
import { DropdownMenu } from "radix-ui";

// export const OLD___NavBar = ({ navItems }) => {
//   const handleFilterChange = useCallback(() => {}, []);

//   const totalItemsCompare = 0;
//   const totalItemsWishlist = 0;
//   const cartItems = useBoundStore((store) => store.cartItems);
//   const totalItemsCart = (cartItems || []).reduce(
//     (acc, curr) => curr.quantity + acc,
//     0
//   );

//   return (
//     <>
//       <div className="lg:py-4 bg-[var(--c-primary)]">
//         <div className="box flex items-center justify-between gap-4">
//           <Link to="/" className="uppercase text-white text-2xl font-bold">
//             Nutrition
//           </Link>

//           {/* NAVIGATION */}

//           <div className="">
//             <CategoriesMenu menuData={navItems} />

//             {/* SEARCH */}

//             <Search
//               onChange={(e) => handleFilterChange({ search: e.target.value })}
//             />
//             <div className="flex items-center gap-4 text-base font-semibold">
//               <Link
//                 to="/signin"
//                 className="flex items-center gap-[5px] bg-[var(--c-primary-light)] py-3 px-5 rounded-[var(--border-radius)] font-normal cursor-pointer text-white"
//               >
//                 <UserIcon className="size-8 text-white" />
//                 Sign-in
//               </Link>
//               <Link
//                 to="/compare"
//                 className="flex items-center gap-[20px] font-normal cursor-pointer text-white py-3 px-5 rounded-[var(--border-radius)] hover:bg-[var(--c-primary-light)]"
//               >
//                 <Badge content={totalItemsCompare}>
//                   <ScaleIcon className="size-8 text-white" />
//                 </Badge>
//               </Link>

//               <Link
//                 to="/wishlist"
//                 className="flex items-center gap-[20px] font-normal cursor-pointer text-white py-3 px-5 rounded-[var(--border-radius)] hover:bg-[var(--c-primary-light)]"
//               >
//                 <Badge content={totalItemsWishlist}>
//                   <HeartIcon className="size-8 text-white" />
//                 </Badge>
//               </Link>

//               <Link
//                 to="/cart"
//                 className="flex items-center gap-[20px] font-normal cursor-pointer text-white py-3 px-5 rounded-[var(--border-radius)] hover:bg-[var(--c-primary-light)]"
//               >
//                 <Badge content={totalItemsCart}>
//                   <ShoppingCartIcon className="size-8 text-white" />
//                 </Badge>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

const MenuDropdown = ({ triggerTitle, children }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="IconButton flex items-center text-white cursor-pointer bg-[var(--c-primary-light)] py-4 px-5 rounded-[4px]"
          aria-label="Customise options"
        >
          <UserIcon className="size-6" />
          {triggerTitle}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

import { useState, useCallback } from "react";

import {
  UserIcon,
  ScaleIcon,
  HeartIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const NavBar = ({ navItems }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useBoundStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleFilterChange = useCallback(() => {}, []);

  const totalItemsCompare = 0;
  const totalItemsWishlist = 0;
  const cartItems = useBoundStore((store) => store.cartItems);
  const totalItemsCart = (cartItems || []).reduce(
    (acc, curr) => curr.quantity + acc,
    0
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="lg:py-4 py-2 bg-[var(--c-primary)]">
        <div className="box flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link
            to="/"
            className="uppercase text-white text-xl lg:text-2xl font-bold"
          >
            Nutrition
          </Link>

          {/* DESKTOP NAVIGATION - прихований на мобільних */}
          <div className="hidden lg:flex flex-grow items-center gap-6">
            <CategoriesMenu menuData={navItems} />

            <Search
              onChange={(e) => handleFilterChange({ search: e.target.value })}
            />

            <div className="flex items-center gap-4 text-base font-semibold">
              {isAuthenticated ? (
                <MenuDropdown triggerTitle={user.username}>
                  <DropdownMenu.Item>Account {user.username}</DropdownMenu.Item>
                  <DropdownMenu.Item onClick={handleLogout}>
                    Logout
                  </DropdownMenu.Item>
                </MenuDropdown>
              ) : (
                <Link
                  to="/signin"
                  className="flex items-center gap-[5px] bg-[var(--c-primary-light)] py-3 px-5 rounded-[var(--border-radius)] font-normal cursor-pointer text-white"
                >
                  <UserIcon className="size-6 text-white" />
                  Sign-in
                </Link>
              )}

              <Link
                to="/compare"
                className="flex items-center gap-[20px] font-normal cursor-pointer text-white py-3 px-5 rounded-[var(--border-radius)] hover:bg-[var(--c-primary-light)]"
              >
                <Badge content={totalItemsCompare}>
                  <ScaleIcon className="size-6 text-white" />
                </Badge>
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center gap-[20px] font-normal cursor-pointer text-white py-3 px-5 rounded-[var(--border-radius)] hover:bg-[var(--c-primary-light)]"
              >
                <Badge content={totalItemsWishlist}>
                  <HeartIcon className="size-6 text-white" />
                </Badge>
              </Link>

              <Link
                to="/cart"
                className="flex items-center gap-[20px] font-normal cursor-pointer text-white py-3 px-5 rounded-[var(--border-radius)] hover:bg-[var(--c-primary-light)]"
              >
                <Badge content={totalItemsCart}>
                  <ShoppingCartIcon className="size-6 text-white" />
                </Badge>
              </Link>
            </div>
          </div>

          {/* MOBILE ELEMENTS - показуються тільки на мобільних */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Кнопки для мобільної версії */}
            <Link
              to="/cart"
              className="relative p-2 text-white hover:bg-[var(--c-primary-light)] rounded"
            >
              <ShoppingCartIcon className="size-6" />
              {totalItemsCart > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItemsCart}
                </span>
              )}
            </Link>

            {/* Бургер меню */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white hover:bg-[var(--c-primary-light)] rounded"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="size-6" />
              ) : (
                <Bars3Icon className="size-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={closeMobileMenu}
        >
          <div
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile menu header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>

            {/* Mobile menu content */}
            <div className="flex flex-col h-full">
              {/* Search */}
              <div className="p-4 border-b">
                <Search
                  onChange={(e) =>
                    handleFilterChange({ search: e.target.value })
                  }
                  className="w-full"
                />
              </div>

              {/* Categories */}
              <div className="flex-1 overflow-y-auto p-4">
                <MobileCategoriesMenu
                  menuData={navItems}
                  onItemClick={closeMobileMenu}
                />
              </div>

              {/* Action buttons */}
              <div className="p-4 border-t space-y-3">
                <Link
                  to="/signin"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 w-full p-3 text-left bg-[var(--c-primary)] text-white rounded-lg hover:bg-[var(--c-primary-light)] transition-colors"
                >
                  <UserIcon className="size-5" />
                  Sign-in
                </Link>

                <div className="grid grid-cols-3 gap-2">
                  <Link
                    to="/compare"
                    onClick={closeMobileMenu}
                    className="flex flex-col items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <div className="relative">
                      <ScaleIcon className="size-6" />
                      {totalItemsCompare > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {totalItemsCompare}
                        </span>
                      )}
                    </div>
                    <span className="text-xs mt-1">Compare</span>
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={closeMobileMenu}
                    className="flex flex-col items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <div className="relative">
                      <HeartIcon className="size-6" />
                      {totalItemsWishlist > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {totalItemsWishlist}
                        </span>
                      )}
                    </div>
                    <span className="text-xs mt-1">Wishlist</span>
                  </Link>

                  <Link
                    to="/cart"
                    onClick={closeMobileMenu}
                    className="flex flex-col items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <div className="relative">
                      <ShoppingCartIcon className="size-6" />
                      {totalItemsCart > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {totalItemsCart}
                        </span>
                      )}
                    </div>
                    <span className="text-xs mt-1">Cart</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Компонент для мобільних категорій
const MobileCategoriesMenu = ({ menuData, onItemClick }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>

      {menuData?.map((category) => (
        <div
          key={category.id}
          className="border-b border-gray-100 last:border-b-0"
        >
          <button
            onClick={() => toggleCategory(category.id)}
            className="flex items-center justify-between w-full p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <span className="font-medium">{category.name}</span>
            <svg
              className={`size-4 transform transition-transform ${
                openCategory === category.id ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openCategory === category.id && category.subcategories && (
            <div className="pl-4 pb-2 space-y-1">
              {category.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  to={`/category/${subcategory.slug}`}
                  onClick={onItemClick}
                  className="block p-2 text-sm text-gray-600 hover:text-[var(--c-primary)] hover:bg-gray-50 rounded"
                >
                  {subcategory.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
