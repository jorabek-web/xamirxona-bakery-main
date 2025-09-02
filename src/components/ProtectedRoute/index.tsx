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
      toast.error("Xatolik yuz berdi qaytadan tizimga kiring !");
      navigate("/login");
    }
    if (user && user.role !== "DOUGHMAKER") {
      toast.error("Bu ilova siz uchun emas!");
      localStorage.removeItem("ACCESS_TOKEN");
      navigate("/login");
    }
  }, [user, isError]);

  if (user && user?.message) {
    return (
      <div className="flex flex-col items-center gap-5">
        <p className="text-white text-center mt-20 text-[24px]">
          {user?.message ?? "Xatolik yuz berdi"}...
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="bg-[#FFCC15] w-40 h-10 rounded-lg text-white"
        >
          sahifani yangilash
        </button>

        {user?.message && (
          <p className="text-[#fff9] text-center text-[16px]">
            tasdiqlangandan so'ng sahifani yangilang
          </p>
        )}
      </div>
    );
  }

  return element;
};
