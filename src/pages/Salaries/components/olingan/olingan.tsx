import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "../../../../components/ui/drawer";
import { Button } from "../../../../components/ui/button";
import {
  useGetMoneyReceivedQuery,
  useGetSingleUserQuery,
} from "../../../../app/api";
import { formatNumberWithSpaces } from "../../../../utils";
import dayjs from "dayjs";

type FromUser = {
  fromUser: {
    _id: string;
    role: string;
    fullName: string;
  };
  createdAt: string;
  amount: number;
};

export const Olingan = () => {
  const { data: user } = useGetSingleUserQuery([]);
  const { data: receivedMoney } = useGetMoneyReceivedQuery({
    id: user?._id!,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [fromUser, setFromUser] = useState<FromUser>();

  return (
    <div className="space-y-5">
      {receivedMoney ? (
        receivedMoney && receivedMoney.length > 0 ? (
          receivedMoney.map((money) => (
            <div
              key={money._id}
              onClick={() => {
                setFromUser({
                  fromUser: money.fromUser,
                  createdAt: money.createdAt,
                  amount: money.amount,
                });
                setIsOpen(true);
              }}
              className="w-full h-16 bg-white border-2 border-[#FFCC15] p-2 px-4 rounded-lg flex items-center justify-between gap-2 text-[#1C2C57] text-[15px] font-[700]"
            >
              <div>
                <p className=" text-[18px]">
                  {formatNumberWithSpaces(money.amount)}
                </p>
                <p
                  className={`${
                    money.totalAmount >= 0 ? "text-[#099431]" : "text-[#C71A1A]"
                  } text-[18px]`}
                >
                  {formatNumberWithSpaces(money.totalAmount)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className=" text-[18px]">
                  {dayjs(money.createdAt).format("DD.MM.YYYY")}
                </p>
                <p className=" text-[18px]">
                  {dayjs(money.createdAt).format("HH:mm")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white font-[600] text-[18px] text-center">
            Ma'lumotlar hozircha yoq
          </p>
        )
      ) : (
        <p className="text-white font-[600] text-[18px] text-center">
          Loading...
        </p>
      )}

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="bg-[#1C2C57] rounded-t-[20px] border-none">
          <div className="p-4 m-4 mb-10 border-2 border-[#FFCC15] rounded-lg">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
            <div className="flex flex-col items-start gap-5 text-[#1C2C57] font-[700]">
              <div className="w-full h-10 bg-white rounded-lg border-2 border-[#FFCC15] flex items-center p-2">
                <p>
                  {fromUser?.fromUser?.fullName ?? "noma'lum"} (
                  {fromUser?.fromUser?.role ?? "noma'lum"})
                </p>
              </div>
              <div className="w-full h-10 bg-white rounded-lg border-2 border-[#FFCC15] flex items-center justify-between gap-5 p-2">
                <p>{formatNumberWithSpaces(fromUser?.amount ?? 0)}</p>
                <div className="flex items-center gap-2">
                  <p>{dayjs(fromUser?.createdAt).format("DD.MM.YYYY")}</p>
                  <p> {dayjs(fromUser?.createdAt).format("HH:mm")}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setIsOpen(false)}
                type="submit"
                className="bg-[#FFCC15] text-[#1C2C57] mt-16 w-24"
              >
                Yopish
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
