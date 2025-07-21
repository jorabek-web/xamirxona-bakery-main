import { BsArrowLeftCircleFill } from "react-icons/bs";
// import { FaShare } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import { FaPlus, FaShare } from "react-icons/fa";
import {
  useDeleteDoughMutation,
  useGetDoughsQuery,
  usePostDoughMutation,
  useReadyDoughMutation,
  useSendToDoughMutation,
} from "../../app/api/doughroomApi";
import dayjs from "dayjs";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Correct, Delete } from "../../icon";
import { Timer } from "../../components/common";
import { ROLES, Status, Type } from "../../constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useGetAllBakeriesQuery } from "../../app/api/bakeryApi";
import {
  usePostNotificationMutation,
  usePushNotificationMutation,
} from "../../app/api";
import { socket } from "../../utils";
import { useGetAllRetsepsQuery } from "../../app/api/retsepApi";
import { string } from "yup";

export const Bakery = () => {
  const navigate = useNavigate();
  const [doughTypeCount, setDoughTypeCount] = useState("");
  const { data: bakeries } = useGetAllBakeriesQuery([]);
  const { data: doughsTypes } = useGetAllRetsepsQuery({});
  const [postDough] = usePostDoughMutation();
  const [deleteDough] = useDeleteDoughMutation();
  const [selectedBakery, setSelectedBakery] = useState("");
  const [selectedDoughType, setSelectedDoughType] = useState("");
  const [readyDough, { isLoading }] = useReadyDoughMutation();
  const [sendToDough, { isLoading: sendToLoading }] = useSendToDoughMutation();
  const [pushNotification] = usePushNotificationMutation();
  const [postNotification] = usePostNotificationMutation();
  const { data } = useGetDoughsQuery({
    id: localStorage.getItem("selectedBranchId") || "",
    date: dayjs().format("YYYY-MM-DD"),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState("");

  const handleAddDough = async () => {
    if (!doughTypeCount || isNaN(Number(doughTypeCount))) {
      toast.error("Xamir sonini to'g'ri kiriting!");
      return;
    }

    if (!selectedDoughType) {
      toast.error("Xamir turini tanlang!");
      return;
    }

    try {
      const response = await postDough({
        doughroomId: localStorage.getItem("selectedBranchId") as string,
        dough_type: selectedDoughType,
        count: Number(doughTypeCount),
      });

      if ("error" in response) {
        const err =
          (response.error as any).data?.message || "Xatolik yuz berdi!";
        throw new Error(err);
      }

      toast.success("Xamir miqdori qo‘shildi!");
      setIsOpen(false);
      setDoughTypeCount("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleBakery = async () => {
    try {
      if (!selectedBakery) {
        toast.error("Nonvoyxonani tanlang !");
        return;
      }

      const result = await sendToDough({
        id: selectedDoughType,
        send_to_baker_room: selectedBakery,
      }).unwrap();

      toast.success("Xamir uzatildi!");

      // const notification = await postNotification({
      //   type: Type.DOUGHS,
      //   role: ROLES.DIVIDER,
      //   doughroom: result.doughroomId,
      //   doughs: [result._id as string],
      // }).unwrap();

      // socket.emit("/notification", notification);

      // await Promise.all(
      //   notification?.users?.map((id) =>
      //     pushNotification({
      //       id,
      //       body: {
      //         title: "Xamir uzatildi.",
      //         body: "Xamir uzatildi, qabul qilasizmi?",
      //         actions: [
      //           { action: "accept", title: "Qabul qilish" },
      //           { action: "decline", title: "Bekor qilish" },
      //         ],
      //         vibrate: [200, 100, 300],
      //       },
      //     })
      //   ) || []
      // );
    
    } catch (error: any) {
      toast.error(error.message || "Kutilmagan xatolik !");
      console.log(error);
    }
  };

  return (
    <>
      <header className="flex justify-between items-center border-b-2 border-b-[#FFCC15] pb-5 px-5 rounded-[30px] mt-3">
        <Toaster position="top-center" reverseOrder={false} />
        <BsArrowLeftCircleFill
          onClick={() => navigate("/home")}
          size={25}
          color="#FFCC15"
        />
        <h1 className="text-white text-center font-inter text-[25px] font-bold tracking-[1px]">
          Xamir miqdori
        </h1>
        <IoMdNotifications
          onClick={() => navigate("/notification")}
          size={25}
          color="#FFCC15"
        />
      </header>

      <div className="px-4 mt-10">
        {data && data.length ? (
          data.map((dough) => (
            <div
              key={dough._id}
              className={
                dough.isReady
                  ? "w-full bg-slate-500  outline outline-1 outline-offset-[-1px] outline-white border-2 rounded-lg p-3 border-solid mt-5"
                  : "w-full bg-white border-2 border-solid border-[#FFCC15] mt-5 rounded-lg p-3"
              }
            >
              <div className="flex gap-5">
                <Alert className="bg-[#F5F6F8] p-2 flex items-center justify-center">
                  <AlertDescription className="font-bold text-[#1C2C57] font-inter text-center">
                    Turi: {dough.dough_type.title}
                  </AlertDescription>
                </Alert>
                <Alert className="bg-[#F5F6F8] p-2">
                  <AlertDescription className="font-bold text-[#1C2C57] font-inter text-center">
                    Vaqti: {dayjs(dough.createdAt).format("HH:mm")}{" "}
                    {dough.isReady ? (
                      <Timer time={dough.updatedAt} />
                    ) : (
                      "Tayyorlanmoqda..."
                    )}
                  </AlertDescription>
                </Alert>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <PiDotsThreeVerticalBold
                        size={30}
                        className={
                          dough.isReady ? "text-white" : "text-[#1C2C57]"
                        }
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-white shadow-lg rounded-md p-2">
                    {dough.isReady ? (
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 p-2 rounded">
                        <FaShare className="text-[#1C2C57]" />{" "}
                        <h4
                          className="font-semibold"
                          onClick={() => {
                            setModalOpen(dough._id);
                            setSelectedDoughType(dough._id);
                          }}
                        >
                          Uzatish
                        </h4>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 p-2 rounded">
                        <Correct />{" "}
                        <h4
                          className="font-[600]"
                          onClick={async () => {
                            try {
                              await readyDough({
                                id: dough._id,
                              });
                              toast.success("Xamir tayyorlandi!");
                            } catch (error: any) {
                              toast.error(error.message);
                            }
                          }}
                        >
                          Tayyor
                        </h4>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded">
                      <Delete />{" "}
                      <h4
                        className="font-semibold"
                        onClick={async () => {
                          try {
                            await deleteDough({ id: dough._id });
                            toast.success("Xamir o'chirildi!");
                          } catch (error: any) {
                            toast.error(error.message);
                          }
                        }}
                      >
                        O'chirish
                      </h4>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center mt-5">Ma'lumot yuklanmoqda...</p>
        )}
      </div>

      <Dialog open={!!modalOpen} onOpenChange={() => setModalOpen("")}>
        <DialogContent className="border-2 border-[#FFCC15] bg-transparent rounded-lg text-[#FFCC15]">
          <Select
            value={selectedBakery || ""}
            onValueChange={(id) => {
              setSelectedBakery(id);
            }}
          >
            <SelectTrigger className="w-full text-main text-[15px] mt-5">
              <SelectValue
                placeholder={selectedBakery || "Nonvoyxonani tanlang"}
              />
            </SelectTrigger>
            <SelectContent>
              {bakeries?.bakerRooms.map((item) => (
                <SelectItem key={item._id} value={item._id}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="mt-8 bg-[#FFCC15] text-[#1C2C57] hover:bg-[#FFCC15]"
            disabled={isLoading}
            onClick={handleBakery}
          >
            {sendToLoading ? "Kuting..." : "Uzatish"}
          </Button>
        </DialogContent>
      </Dialog>

      <div className="sticky bottom-0">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="flex justify-end items-end relative p-4">
              <Button
                variant="outline"
                className="rounded-[50%] p-4 bg-[#FFCC15] w-14 h-14"
              >
                <FaPlus size={25} />
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="border-2 border-[#FFCC15] bg-transparent rounded-lg text-[#FFCC15]">
            <Select
              value={selectedDoughType || ""}
              onValueChange={(id) => {
                setSelectedDoughType(id);
              }}
            >
              <SelectTrigger className="w-full text-main text-[15px] mt-5">
                <SelectValue placeholder={selectedDoughType || "Xamir turi"} />
              </SelectTrigger>
              <SelectContent>
                {doughsTypes?.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="name" className="text-right ">
                  Xamir soni
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={doughTypeCount}
                  onChange={(e) => setDoughTypeCount(e.target.value)}
                  placeholder="2"
                  className="mt-2 text-[#1C2C57] font-bold font-inter"
                />
              </div>
              <Button
                className="mt-8 flex-1 bg-[#FFCC15] text-[#1C2C57] hover:bg-[#FFCC15]"
                type="submit"
                onClick={handleAddDough}
                disabled={isLoading}
              >
                {isLoading ? "Kuting..." : "Kiritish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
