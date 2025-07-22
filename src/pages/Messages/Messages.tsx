import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import {
  Drawer,
  DrawerContent,
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
import { IoPersonAddSharp } from "react-icons/io5";
import { useGetAllMessagesQuery } from "../../app/api/messagesApi";
import { useGetAllUsersQuery } from "../../app/api";
import { ROLES } from "../../constants";

export const Messages = () => {
  const { data, isLoading } = useGetAllMessagesQuery([]);
  const { data: allUsers } = useGetAllUsersQuery({
    roles: Object.values(ROLES),
  });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <>
      <header className="border-b-2 border-b-[#FFCC15] pb-5 px-5 rounded-[30px] mt-4">
        <h1 className="text-white text-center font-inter text-[25px] font-bold tracking-[1px]">
          Message
        </h1>
      </header>
      <div className="px-4 mt-10">
        {data?.map((item) => {
          return (
            <Alert
              key={item.chat?._id || "1"}
              onClick={() => navigate(`/message/${item.chat?._id}`)}
              className="flex gap-2 mb-5 p-2"
            >
              <img
                className="w-[50px] h-[50px]"
                src={item.chat?.avatar}
                width={50}
                height={50}
                alt="person"
              />
              <AlertDescription>
                <span className="font-bold text-[14px] text-[#1C2C57]">
                  {item.chat?.fullName || "Not found"}
                </span>
                <p className=" text-[12px] text-[#1C2C57]">
                  {item.lastMessage}
                </p>
              </AlertDescription>
            </Alert>
          );
        }) ||
          (isLoading && "Loading...")}
      </div>

      <Drawer>
        <DrawerTrigger>
          <div className="flex items-end absolute right-0  min-h-[30vh] p-4">
            <Button
              variant="outline"
              className="bg-[#FFCC15] rounded-[50%] w-[50px] h-[50px] hover:bg-[#FFCC15]"
            >
              {" "}
              <IoPersonAddSharp size={35} color="#1C2C57" />{" "}
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-[#1C2C57] flex flex-col justify-between min-h-[45vh]">
          <div className="px-4 flex-grow overflow-y-auto">
            <Select
              onValueChange={setSelectedUser}
              open={open}
              onOpenChange={setOpen}
            >
              <SelectTrigger className="w-full mt-8 mb-36 none">
                <SelectValue placeholder="Xodimni tanlang" />
              </SelectTrigger>
              <SelectContent className=" absolute top-full mt-2 z-50 max-h-60 overflow-y-auto bg-white shadow-lg rounded-md">
                <SelectGroup>
                  {allUsers?.map((user) => (
                    <SelectItem
                      key={user._id}
                      className="text-[16px] font-bold font-inter text-[#1C2C57]"
                      value={user._id}
                    >
                      <div className="flex items-center gap-5">
                        {user.fullName}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>

              <button
                onClick={() =>
                  selectedUser && navigate(`/message/${selectedUser}`)
                }
                className="absolute  bottom-0 right-0 mb-5 mr-5 px-10 py-1 rounded-lg bg-[#FFCC15]"
              >
                Kiritish
              </button>
            </Select>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
