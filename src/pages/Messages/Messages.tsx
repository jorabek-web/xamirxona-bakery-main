import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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
import { useGetAllUsersQuery, useGetSingleUserQuery } from "../../app/api";
import { ROLES } from "../../constants";

export const Messages = () => {
  const { data, isLoading } = useGetAllMessagesQuery([]);
  // const [readMsg] = useReadMessageMutation();
  const { data: singleUser } = useGetSingleUserQuery([]);
  const { data: allUsers } = useGetAllUsersQuery({
    roles: Object.values(ROLES),
  });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  function getAvatarUrl(avatar: any): string {
    const fallback =
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    try {
      return JSON.parse(avatar)?.url || fallback;
    } catch {
      return fallback;
    }
  }

  return (
    <>
      <header className="border-b-2 border-b-[#FFCC15] pb-5 px-5 rounded-[30px] mt-4">
        <h1 className="text-white text-center font-inter text-[25px] font-bold tracking-[1px]">
          Message
        </h1>
      </header>
      <div className="px-4 mt-10">
        {data || !isLoading ? (
          data && data.length !== 0 ? (
            data?.map((item) => {
              return (
                <Alert
                  key={item.user._id || "1"}
                  onClick={() => navigate(`/message/${item.user._id}`)}
                  className="flex gap-2 mb-5 p-2"
                >
                  <img
                    className="w-[50px] h-[50px] rounded-md"
                    src={getAvatarUrl(item.user?.avatar)}
                    width={50}
                    height={50}
                    alt="person"
                  />
                  <AlertDescription>
                    <span className="font-bold text-[14px] text-[#1C2C57]">
                      {item.user?.fullName || "Not found"}
                    </span>
                    <p className=" text-[12px] text-[#1C2C57]">
                      {item.lastMessage.content}
                    </p>
                    {item.unreadCount > 0 && (
                      <p className="absolute top-1 right-2 w-6 h-6 rounded-full bg-[#1C2C57] text-white text-center">
                        {item.unreadCount}
                      </p>
                    )}
                  </AlertDescription>
                </Alert>
              );
            })
          ) : (
            <p className="text-white text-[22px] text-center ">
              Yozishmalar mavjud emas
            </p>
          )
        ) : (
          <p className="text-white text-[20px] text-center ">Loading...</p>
        )}
      </div>

      <Drawer>
        <DrawerTrigger>
          <div className="flex items-end absolute right-0  min-h-[30vh] p-4">
            <Button
              variant={"outline"}
              className="bg-[#FFCC15] rounded-[50%] w-[50px] h-[50px] fixed bottom-32 right-5 hover:bg-[#FFCC15]"
            >
              {" "}
              <IoPersonAddSharp size={35} color="#1C2C57" />{" "}
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-[#1C2C57] flex flex-col justify-between min-h-[45vh]">
          <VisuallyHidden>
            <DrawerTitle>shikoyat</DrawerTitle>

            <DrawerDescription>shikoyat yuborish</DrawerDescription>
          </VisuallyHidden>

          <div className="px-4 flex-grow overflow-y-auto">
            <Select
              onValueChange={setSelectedUser}
              open={open}
              onOpenChange={setOpen}
            >
              <SelectTrigger className="w-full mt-8 mb-36 outline-none bg-white text-[#1C2C57] font-[600]">
                <SelectValue placeholder="Xodimni tanlang" />
              </SelectTrigger>
              <SelectContent className=" absolute top-full mt-2 z-50 max-h-60 overflow-y-auto bg-white shadow-lg rounded-md">
                <SelectGroup>
                  {allUsers
                    ?.filter((user) => user._id !== singleUser?._id)
                    .map((user) => (
                      <SelectItem
                        key={user._id}
                        className="text-[16px] font-bold font-inter text-[#1C2C57]"
                        value={user._id}
                      >
                        <div className="flex items-center gap-5">
                          {user.fullName} {": "} {user.role}
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
