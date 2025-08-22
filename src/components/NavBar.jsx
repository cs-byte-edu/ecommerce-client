import { Link } from "react-router";
import {
  ShoppingCartIcon,
  HeartIcon,
  ScaleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Search } from "./Search";
import { Menu } from "./ui/menu/Menu";
import { Badge } from "./Badge";
import { useCallback } from "react";
import { useBoundStore } from "../store";

const NavBar__ = ({ navItems }) => {
  const handleFilterChange = useCallback(() => {}, []);

  const totalItemsCompare = 0;
  const totalItemsWishlist = 0;
  const cartItems = useBoundStore((store) => store.cartItems);
  const totalItemsCart = (cartItems || []).reduce(
    (acc, curr) => curr.quantity + acc,
    0
  );

  return (
    <>
      <div className="border-t border-b border-gray-300 lg:pt-[30px] lg:pb-[30px]">
        <div className="box flex items-center justify-between">
          <Link
            to="/"
            className="uppercase text-[var(--c-green-500)] text-2xl font-bold"
          >
            Nutrition
          </Link>
          {/* SEARCH */}
          <Search
            onChange={(e) => handleFilterChange({ search: e.target.value })}
          />
          <div className="flex items-center gap-[20px] text-base font-semibold">
            <Link
              to="/compare"
              className="flex items-center gap-[20px] font-normal cursor-pointer text-white "
            >
              <Badge title="Compare" content={totalItemsCompare}>
                <ArrowPathIcon className="rotate-45 size-8 text-white" />
              </Badge>
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center gap-[20px] font-normal cursor-pointer text-white "
            >
              <Badge title="Wishlist" content={totalItemsWishlist}>
                <HeartIcon className="size-8 text-white" />
              </Badge>
            </Link>

            <Link to="/cart" className="">
              <Badge title="Cart" content={totalItemsCart}>
                <ShoppingCartIcon className="size-8 text-white" />
              </Badge>
            </Link>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="border-b border-gray-300 lg:pt-[15px] lg:pb-[15px]">
        <div className="box">
          <Menu navItems={navItems} />
        </div>
      </div>
    </>
  );
};

export const NavBar = ({ navItems }) => {
  const handleFilterChange = useCallback(() => {}, []);

  const totalItemsCompare = 0;
  const totalItemsWishlist = 0;
  const cartItems = useBoundStore((store) => store.cartItems);
  const totalItemsCart = (cartItems || []).reduce(
    (acc, curr) => curr.quantity + acc,
    0
  );

  return (
    <>
      <div className="lg:py-4 bg-[var(--c-primary)]">
        <div className="box flex items-center justify-between gap-4">
          <Link to="/" className="uppercase text-white text-2xl font-bold">
            Nutrition
          </Link>
          {/* NAVIGATION */}
          <Menu navItems={navItems} />
          {/* SEARCH */}
          <Search
            onChange={(e) => handleFilterChange({ search: e.target.value })}
          />
          <div className="flex items-center gap-4 text-base font-semibold">
            <Link
              to="/signin"
              className="flex items-center gap-[5px] bg-[var(--c-primary-light)] py-3 px-5 rounded-[var(--border-radius)] font-normal cursor-pointer text-white"
            >
              <UserIcon className="size-8 text-white" />
              Sign-in
            </Link>
            <Link
              to="/compare"
              className="flex items-center gap-[20px] font-normal cursor-pointer text-white py-3 px-5 rounded-[var(--border-radius)] hover:bg-[var(--c-primary-light)]"
            >
              <Badge content={totalItemsCompare}>
                <ScaleIcon className="size-8 text-white" />
              </Badge>
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center gap-[20px] font-normal cursor-pointer text-white py-3 px-5 rounded-[var(--border-radius)] hover:bg-[var(--c-primary-light)]"
            >
              <Badge content={totalItemsWishlist}>
                <HeartIcon className="size-8 text-white" />
              </Badge>
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-[20px] font-normal cursor-pointer text-white py-3 px-5 rounded-[var(--border-radius)] hover:bg-[var(--c-primary-light)]"
            >
              <Badge content={totalItemsCart}>
                <ShoppingCartIcon className="size-8 text-white" />
              </Badge>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
