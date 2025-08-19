import { useState } from "react";
import {
  useGetMoneyReceivedQuery,
  useGetSingleUserQuery,
} from "../../../../app/api";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "../../../../components/ui/drawer";
import { Button } from "../../../../components/ui/button";

export const Olingan = () => {
  const { data: user } = useGetSingleUserQuery([]);
  const { data: receivedMoney } = useGetMoneyReceivedQuery({
    id: user?._id!,
  });
  const [isOpen, setIsOpen] = useState(false);
  // console.log(receivedMoney);

  return (
    <div className="space-y-5">
      <div
        onClick={() => setIsOpen(true)}
        className="w-full h-12 bg-white border-2 border-[#FFCC15] p-2 px-4 rounded-lg flex items-center justify-between gap-2 text-[#1C2C57] text-[15px] font-[700]"
      >
        <div>
          <p>500 000</p>
          <p className="text-[#C71A1A]">-450 000</p>
        </div>

        <div className="flex items-center gap-2">
          <p>29.03.2025 </p>
          <p>21:30</p>
        </div>
      </div>
      <div
        onClick={() => setIsOpen(true)}
        className="w-full h-12 bg-white border-2 border-[#FFCC15] p-2 px-4 rounded-lg flex items-center justify-between gap-2 text-[#1C2C57] text-[15px] font-[700]"
      >
        <div>
          <p>1 550 000</p>
          <p className="text-[#099431]">1 000 000</p>
        </div>

        <div className="flex items-center gap-2">
          <p>29.03.2025 </p>
          <p>19:40</p>
        </div>
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="bg-[#1C2C57] rounded-t-[20px] border-none">
          <div className="p-4 m-4 mb-10 border-2 border-[#FFCC15] rounded-lg">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
            <div className="flex flex-col items-start gap-5 text-[#1C2C57] font-[700]">
              <div className="w-full h-10 bg-white rounded-lg border-2 border-[#FFCC15] flex items-center p-2">
                <p>Shuhrat (Admin)</p>
              </div>
              <div className="w-full h-10 bg-white rounded-lg border-2 border-[#FFCC15] flex items-center justify-between gap-5 p-2">
                <p>500 000</p>
                <p>04.12.2024 10:35</p>
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
