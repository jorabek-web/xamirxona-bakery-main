import { CiUser } from "react-icons/ci";
import { RiHome5Fill } from "react-icons/ri";
import { TbMessageDots } from "react-icons/tb";

export const MENU_BAR = [
  {
    icon: <RiHome5Fill size={25} />,
    label: "Asosiy",
    link: "/home",
  },
  {
    icon: <TbMessageDots size={25} />,
    label: "Messages",
    link: "/messages",
  },
  {
    icon: <CiUser size={25} />,
    label: "Profil",
    link: "/profile",
  },
];
