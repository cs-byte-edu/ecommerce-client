import { DropdownMenu } from "radix-ui";
// import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import "./style.css";

import emailImg from "../../../assets/img/email.svg";
import phoneImg from "../../../assets/img/phone.svg";
import telegramLogo from "../../../assets/img/telegram.svg";
import viberLogo from "../../../assets/img/viber.svg";

const MenuDropdown = ({ triggerTitle }) => {
  // const [bookmarksChecked, setBookmarksChecked] = useState(true);
  // const [urlsChecked, setUrlsChecked] = useState(false);
  // const [person, setPerson] = useState("pedro");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
          <span className="">{triggerTitle}</span>
          <ChevronDownIcon className="size-3" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItem">
            <img src={phoneImg} alt="phone image" width={28} height={28} /> + 1
            800 777 88 99
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            <img
              src={telegramLogo}
              alt="telegram logo"
              width={30}
              height={30}
            />{" "}
            @telegram_account
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem" disabled>
            <img src={emailImg} alt="email image" width={28} height={28} />{" "}
            nutrition@gmail.com
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem" disabled>
            <img src={viberLogo} alt="viber logo" width={28} height={28} />{" "}
            @viber_account
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export { MenuDropdown };
