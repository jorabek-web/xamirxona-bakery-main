import { IoMdNotifications } from "react-icons/io";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useGetStockQuery } from "../../app/api/doughroomApi";

export const Storage = () => {
  const navigate = useNavigate();
  const branchId = localStorage.getItem("selectedBranchId");
  const { data: stock } = useGetStockQuery({ id: branchId as string });

  return (
    <div>
      <header className="flex justify-between items-center border-b-2 border-b-[#FFCC15] pb-5 px-5 rounded-[30px] mt-4">
        <BsArrowLeftCircleFill
          onClick={() => navigate("/home")}
          size={25}
          color="#FFCC15"
        />
        <h1 className="text-white text-center font-inter text-[25px] font-bold tracking-[1px]">
          Omborxona
        </h1>
        <IoMdNotifications
          onClick={() => navigate("/notification")}
          size={25}
          color="#FFCC15"
        />
      </header>
      <div className="mt-[10px] w-[95%] m-auto p-[12px] rounded-lg">
        <div className="flex flex-col gap-y-3 items-center mt-10">
          {stock?.warehouse.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg py-2 px-3 w-full flex justify-between items-center cursor-pointer"
            >
              <h4 className="text-center text-[#1b2b56] text-[16px] font-[600]">
                {item?.ingredient.title}
              </h4>
              <div className="p-1.5 bg-[#1b2b56] w-10 h-10 rounded-lg justify-center items-center gap-1 inline-flex overflow-hidden">
                <h5 className="text-center text-[#ffcb15] text-[16px] font-[600]">
                  {item?.amount}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
