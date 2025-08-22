import { Link, useNavigate } from "react-router";
import {
  TruckIcon,
  PercentBadgeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useBoundStore } from "../store";
import { MenuDropdown } from "../components/ui/menuDropdown/menuDropdown";

export const HeaderTop = () => {
  const { isAuthenticated, logout, user } = useBoundStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="box lg:py-2">
      <div className="flex items-center justify-between gap-4 text-sm text-white leading-tight">
        <div className="flex items-center gap-4">
          <Link to="delivery-and-payment" className="flex items-center gap-2">
            <TruckIcon className="size-6" />
            Delivery & Payment
          </Link>
          <Link to="best-deals" className="flex items-center gap-2">
            <PercentBadgeIcon className="size-6" />
            Best Deals
          </Link>
          <Link to="about-us" className="flex items-center gap-2">
            <InformationCircleIcon className="size-6" />
            About Us
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <PhoneIcon className="size-6" />
            <span className="">+1800900122</span>
          </div>
          <div className="flex items-center gap-2">
            <ChatBubbleLeftRightIcon className="size-6" />
            <MenuDropdown triggerTitle={"Contact us"} />
          </div>
        </div>
      </div>
    </div>
  );
};
