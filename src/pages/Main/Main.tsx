import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "../../components/ui/alert";
import { BiSolidMessageError } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { useGetSingleUserQuery } from "../../app/api";
import { useGetAllRetsepsQuery } from "../../app/api/retsepApi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../components/ui/table";
import { useEffect } from "react";
import { useGetByIdDoughroomQuery } from "../../app/api/doughroomApi";

export const Main = () => {
  const navigate = useNavigate();
  const { data: retsepts } = useGetAllRetsepsQuery([]);
  const { data: user } = useGetSingleUserQuery([]);
  const { data: doughroom } = useGetByIdDoughroomQuery({
    id: localStorage.getItem("selectedBranchId") || "",
  });
  const selectedBranchId = localStorage.getItem("selectedBranchId");
  const token = localStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    if (user?.doughroom && user._id) {
      localStorage.setItem("selectedBranchId", user.doughroom);
      localStorage.setItem("userId", user._id);
    }
    if (!token) {
      window.location.href = "/login";
    }
  }, [user, token]);

  if ((user && user?.message) || !user?.doughroom || !selectedBranchId) {
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

  return (
    <div className="overflow-y-auto">
      <header className="flex justify-center items-center border-b-2 border-b-[#FFCC15] pb-3 rounded-[30px] mt-3">
        <h2 className="text-white text-center font-inter text-[25px] font-bold tracking-[1px] mt-2 flex items-center gap-2">
          {doughroom?.title}
        </h2>

        <IoMdNotifications
          onClick={() => navigate("/notification")}
          className="relative left-12"
          size={25}
          color="#FFCC15"
          cursor={"pointer"}
        />
      </header>

      <div className="w-full mt-5">
        <div className="mt-5 ml-5">
          <BiSolidMessageError
            onClick={() => navigate("/information")}
            size={25}
            color="#FFCC15"
            cursor={"pointer"}
          />
        </div>
        <div className="flex gap-5 mt-10 justify-center px-5">
          <Link
            className="w-full bg-white rounded-[16px] border-4 border-solid border-[#FFCC15] text-[#1C2C57] text-center font-bold text-[20px] py-11"
            to={"/storage"}
          >
            Omborxona
          </Link>
          <Link
            className="w-full bg-white rounded-[16px] border-4 border-solid border-[#FFCC15] text-[#1C2C57] text-center font-bold text-[20px] py-11"
            to={"/bakery"}
          >
            Xamir
          </Link>
        </div>
      </div>

      <div className="mt-8 px-4">
        <p className="text-[#FFCC15] font-bold text-[20px] tracking-[5px] mb-3">
          Retsept
        </p>

        {retsepts ? (
          <Accordion type="single" collapsible className="my-4 space-y-4">
            {retsepts.map((retsept) => (
              <AccordionItem key={retsept._id} value={retsept.title}>
                <AccordionTrigger className="hover:no-underline bg-white p-2 rounded-lg border-2 border-yellow-400">
                  {retsept.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-center my-2">
                    <span className="text-[#FFCC15] text-[14px] font-bold pl-10 flex-1">
                      Mahsulot
                    </span>
                    <span className="text-[#FFCC15] text-[14px] font-bold pl-10 flex-1">
                      Miqdor
                    </span>
                  </div>

                  <div className="rounded-lg border border-yellow overflow-hidden">
                    <Table className="bg-white">
                      <TableBody>
                        {retsept.ingredients.map((ingredient) => (
                          <TableRow
                            key={ingredient._id}
                            className="hover:bg-transparent border-b border-b-yellow"
                          >
                            <TableCell className="font-bold text-[15px] text-[#1C2C57] p-2 w-1/2 pl-10">
                              {ingredient.ingredient?.title ?? "nomi"}
                            </TableCell>
                            <TableCell className="font-bold text-[15px] text-[#1C2C57] p-2 w-1/2 pl-10">
                              {ingredient?.amount ?? "0"}{" "}
                              {ingredient.ingredient?.scope ?? "qamrovi"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Alert className="flex justify-center items-center py-2 my-4">
            <AlertTitle className="font-bold text-[16px]">
              Ushbu branchda retseptlar yo'q
            </AlertTitle>
          </Alert>
        )}
      </div>
    </div>
  );
};
