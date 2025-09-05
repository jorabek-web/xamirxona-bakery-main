import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
// images
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../../components/ui/textarea";
import { FaPlus } from "react-icons/fa6";
import {
  useGetAllComplaintsQuery,
  useGetMyComplaintsQuery,
  usePostComplaintMessageMutation,
} from "../../app/api/complaintApi";
import { useGetAllUsersQuery, useGetSingleUserQuery } from "../../app/api";
import { ROLES } from "../../constants";
import { Toaster, toast } from "react-hot-toast";

export const Information = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data: complaints = [] } = useGetAllComplaintsQuery({ skip: false });
  const { data: my_complaints = [] } = useGetMyComplaintsQuery({ skip: false });
  const { data: single_user } = useGetSingleUserQuery({ skip: false });
  const { data: allUsers } = useGetAllUsersQuery(
    { roles: Object.values(ROLES) },
    { skip: false }
  );

  const [postMessage] = usePostComplaintMessageMutation();
  const [message, setMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const handelPostComplaintMessage = async () => {
    if (!selectedUserId || !message.trim()) {
      toast.error("Iltimos, xodimni tanlang va xabar yozing!");
      return;
    }

    const response = await postMessage({
      to: selectedUserId,
      content: message,
    });

    if ("error" in response) {
      const err = response.error as { data?: { message?: string } };
      const message = err.data?.message ?? "Xatolik yuz berdi!";
      toast.error(message);
      return;
    }

    toast.success("Shikoyatingiz yuborildi");
    setOpen(false);
  };

  return (
    <>
      <header className="flex justify-between items-center border-b-2 border-b-[#FFCC15] pb-5 px-5 mt-5 rounded-[30px]">
        <Toaster position="top-center" reverseOrder={false} />
        <BsArrowLeftCircleFill
          onClick={() => navigate(-1)}
          size={25}
          color="#FFCC15"
        />
        <h1 className="text-white text-center font-inter text-[25px] font-bold tracking-[1px]">
          Shikoyatlar
        </h1>
        <IoMdNotifications
          onClick={() => navigate("/notification")}
          size={25}
          color="#FFCC15"
        />
      </header>

      <div className="mx-5 mt-5">
        <Accordion type="single" collapsible className="w-full ">
          <AccordionItem value="item-1" className="bg-transparent ">
            <AccordionTrigger className=" hover:no-underline text-white text-[24px]">
              Kelib tushgan shikoyatlar
            </AccordionTrigger>
            {complaints && single_user ? (
              complaints && complaints.length > 0 ? (
                complaints
                  ?.filter(
                    (complaint) => complaint.from._id !== single_user._id!
                  )
                  .map((complaint) => {
                    return (
                      <AccordionContent
                        key={complaint?._id}
                        className="bg-white p-2 border-2 border-[#FFCC15] rounded-lg mb-3"
                      >
                        <h2 className="text-[#1C2C57] font-bold text-[18px] mb-2">
                          {complaint.from?.role}
                        </h2>
                        <p className="text-[#1C2C57] font-bold text-[14px] ">
                          {complaint.content}
                        </p>
                        <span className="block  text-end text-[#C71A1A] text-[15px] font-bold mt-2">
                          {complaint.from?.fullName}
                        </span>
                      </AccordionContent>
                    );
                  })
              ) : (
                <AccordionContent>
                  <p className="text-white text-[16px] text-center">
                    Hozircha mavjud emas !
                  </p>
                </AccordionContent>
              )
            ) : (
              <AccordionContent>
                <p className="text-white text-[16px] text-center">Loading...</p>
              </AccordionContent>
            )}
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full mt-5">
          <AccordionItem value="item-1" className="bg-transparent ">
            <AccordionTrigger className=" hover:no-underline text-white text-[24px] ">
              Yuborilganlar
            </AccordionTrigger>
            {my_complaints ? (
              my_complaints.length > 0 ? (
                my_complaints.map((complaint) => {
                  return (
                    <AccordionContent
                      key={complaint._id}
                      className="bg-white text-[] p-2 border-2 border-[#FFCC15] rounded-lg mb-3"
                    >
                      <h2 className="text-[#1C2C57] font-bold text-[18px] mb-2">
                        {complaint.to?.role}
                      </h2>
                      <p className="text-[#1C2C57] font-bold text-[14px] ">
                        {complaint.content}
                      </p>
                      <span className="block text-end text-[#C71A1A] text-[15px] font-bold mt-2">
                        {complaint.to?.fullName}
                      </span>
                    </AccordionContent>
                  );
                })
              ) : (
                <AccordionContent>
                  <p className="text-white text-[16px] text-center">
                    Hozircha mavjud emas !
                  </p>
                </AccordionContent>
              )
            ) : (
              <AccordionContent>
                <p className="text-white text-[16px] text-center">Loading...</p>
              </AccordionContent>
            )}
          </AccordionItem>
        </Accordion>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <div className="flex items-end fixed right-0  min-h-[25vh] p-4">
            <Button
              variant="outline"
              className="bg-[#FFCC15] rounded-[50%] w-[50px] h-[50px] fixed bottom-20 right-5 hover:bg-[#FFCC15]"
            >
              {" "}
              <FaPlus size={30} color="#1C2C57" />{" "}
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-[#1C2C57] flex flex-col justify-between min-h-[45vh]">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>

          <div className="px-4 flex-grow overflow-y-auto">
            <Select onValueChange={setSelectedUserId}>
              <SelectTrigger className="w-full mt-8 mb-4 outline-none bg-white text-[#1C2C57] font-[600]">
                <SelectValue placeholder="Xodimni tanlang" />
              </SelectTrigger>

              <SelectContent className=" absolute top-full mt-2 z-50 max-h-60 overflow-y-auto bg-white shadow-lg rounded-md">
                <SelectGroup>
                  {allUsers && single_user ? (
                    allUsers
                      ?.filter((user) => user._id !== single_user._id)
                      .map((user) => (
                        <SelectItem
                          key={user._id}
                          className="text-[16px] font-bold font-inter text-[#1C2C57] rounded-none border-0 border-b-2 border-[#FFCC15]"
                          value={user._id}
                        >
                          <div className="flex items-center gap-5">
                            {user.fullName} {": "} {user.role}
                          </div>
                        </SelectItem>
                      ))
                  ) : (
                    <SelectItem value="default">
                      <p>xodmilar yoq</p>
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>

              <Textarea
                onChange={(e) => setMessage(e.target.value)}
                className="h-[20vh] "
                placeholder="Type your message here."
              />

              <button
                onClick={handelPostComplaintMessage}
                className="absolute  bottom-0 right-0 mb-5 mr-5 px-10 py-1 rounded-lg bg-[#FFCC15]"
              >
                Yuborish
              </button>
            </Select>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
