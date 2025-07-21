import { Link, useLocation } from "react-router-dom";
import { MENU_BAR } from "../../constants";

export const BottomSheet = () => {
  const location = useLocation();

  return (
    <div className="border-t-2 border-[#FFCC15] rounded-t-[40px] bg-[#1C2C57] p-[12px] fixed bottom-0 w-full">
      <div className="flex w-full justify-evenly items-center">
        {MENU_BAR.map((item) => {
          const isActive =
            (item.link === "/orders" &&
              `/${location.pathname.split("/")[1]}` === "/debtors") ||
            `/${location.pathname.split("/")[1]}` === "/order"
              ? true
              : `/${location.pathname.split("/")[1]}` === item.link;
          return (
            <Link to={item.link} key={item.label}>
              <div className="flex flex-col items-center text-center">
                <span
                  className={`${
                    isActive ? "text-[#FFCC15]" : "text-white"
                  } text-lg`}
                >
                  {item.icon}
                </span>
                <p
                  className={`text-[11px] mt-[2px] font-semibold font-inter leading-[14.30px] ${
                    isActive ? "text-[#FFCC15]" : "text-white"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
