import { NavLink } from "react-router-dom";
import { MENU_BAR } from "../../constants";

export const Menu = () => {
  return (
    <div className="w-full border-t-2 border-t-[#FFCC15] rounded-[30px] flex justify-between px-5 py-5 ">
      {MENU_BAR?.map((item, index) => {
        return (
          <NavLink
            className="flex flex-col items-center"
            key={index}
            to={item.link}
          >
            {item.icon}
            {item.label}
          </NavLink>
        );
      })}
    </div>
  );
};
