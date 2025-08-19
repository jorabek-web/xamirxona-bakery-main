import { useMemo } from "react";
import { BottomSheet } from "../bottom-sheet";
import { Props } from "./types";
import { matchPath, useLocation } from "react-router-dom";

const ALL_ROUTES = [
  "/login",
  "/storage",
  "/bakery",
  "/notification",
  "/messages",
  "/profile",
  "/message",
  "/information",
  "/home",
  "/salaries",
];
const PUBLIC_ROUTES = [
  "/login",
  "/storage",
  "/bakery",
  "/notification",
  "/message",
  "/information",
];

export const Layout = ({ children }: Props) => {
  const { pathname } = useLocation();

  const isValidRoute = useMemo(() => {
    return ALL_ROUTES.some((route) => matchPath({ path: route }, pathname));
  }, [pathname]);

  const isAuth = useMemo(() => {
    return (
      isValidRoute &&
      !PUBLIC_ROUTES.some((route) => matchPath({ path: route }, pathname))
    );
  }, [pathname, isValidRoute]);

  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex-grow pb-20">{children}</div>
      {isValidRoute && isAuth && <BottomSheet />}
    </div>
  );
};
