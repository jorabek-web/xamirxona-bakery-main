import { useNavigate } from "react-router-dom";
import { useGetSingleUserQuery } from "../../app/api";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  element: JSX.Element;
}

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { data: user, isError } = useGetSingleUserQuery({});

  useEffect(() => {
    if (isError && navigator.onLine) {
      localStorage.removeItem("ACCESS_TOKEN");
      navigate("/login");
    }
    if (user && user.role !== "DOUGHMAKER") {
      toast.error("Bu ilova siz uchun emas!");
      localStorage.removeItem("ACCESS_TOKEN");
      navigate("/login");
    }
  }, [user]);

  return element;
};
