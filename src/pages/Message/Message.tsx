import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { AlertTitle } from "../../components/ui/alert";
import dayjs from "dayjs";
// images
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import {
  IoCheckmarkDoneOutline,
  IoCheckmarkOutline,
  IoSend,
} from "react-icons/io5";
// api
import {
  useGetSingleUserQuery,
  useGetUserByIdQuery,
} from "../../app/api/userApi";
import {
  useGetMessageQuery,
  usePostMessageMutation,
  useReadMessageMutation,
} from "../../app/api";
import toast, { Toaster } from "react-hot-toast";

export const Message = () => {
  const { id } = useParams();
  const { data } = useGetUserByIdQuery(id as string);

  const [post, { isLoading }] = usePostMessageMutation();
  const [readMsg] = useReadMessageMutation();
  const { data: user } = useGetSingleUserQuery([]);
  const { data: info, refetch } = useGetMessageQuery(id);

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) {
      toast.error("Yuborish uchun xabarni yozing !");
      return;
    }

    try {
      await post({ receiverId: id as string, content: message }).unwrap();

      setMessage("");
      refetch();
    } catch (error) {
      console.error("Xabar yuborishda xatolik:", error);
      toast.error("Xabar yuborishda xatolik !");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleReadMessage = async ({ idUser, idMsg }: any) => {
    if (!idUser && !idMsg) {
      return;
    }

    await readMsg({
      idUser,
      idMsg,
    });
  };

  useEffect(() => {
    if (user && info && info.messages.length !== 0) {
      info.messages.forEach((msg) => {
        if (msg.sender !== user._id && msg.isRead !== true) {
          handleReadMessage({ idUser: msg.sender, idMsg: msg._id });
        }
      });
    }
  }, [user, info]);

  return (
    <>
      <header className="flex items-center gap-10 border-b-2 border-b-[#FFCC15] pb-5 px-5 rounded-[30px] mt-4">
        <Toaster position="top-center" reverseOrder={false} />
        <FaArrowLeftLong
          onClick={() => navigate("/messages")}
          color="white"
          size={20}
        />
        <Avatar>
          <AvatarImage src={data?.avatar} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-white text-center font-inter text-[25px] font-bold tracking-[1px]">
          {data?.fullName}
        </h1>
      </header>

      <div className="flex-row-reverse p-5 overflow-y-auto space-y-5">
        {info ? (
          info.messages.length !== 0 ? (
            info?.messages.map(
              (msg, index) => (
                (msg = info?.messages[info.messages.length - index - 1]!),
                (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender !== id ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`${
                        msg.sender !== id ? "bg-[#6C63FF]" : "bg-white"
                      } p-5 pb-6 rounded-lg shadow-lg relative max-w-xs`}
                    >
                      {msg.sender === id && (
                        <AlertTitle className="text-md font-bold">
                          {data?.fullName}
                        </AlertTitle>
                      )}
                      <p
                        className={`text-[16px] ${
                          msg.sender !== id ? "text-white" : "text-[#1C2C57]"
                        }`}
                      >
                        {msg?.content}
                      </p>
                      <span className="text-white absolute bottom-1 left-2">
                        {msg.sender !== id &&
                          (msg.isRead ? (
                            <IoCheckmarkDoneOutline size={20} />
                          ) : (
                            <IoCheckmarkOutline size={20} />
                          ))}
                      </span>
                      <span
                        className={`block text-xs ${
                          msg.sender !== id ? "text-gray-300" : "text-[#1C2C57]"
                        } absolute bottom-1 right-2 `}
                      >
                        {dayjs(msg?.createdAt).format("HH:MM")}
                      </span>
                      {msg.sender === id ? (
                        <div className="absolute left-[-9px] top-[50%] transform -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-r-[10px] border-r-white"></div>
                      ) : (
                        <div className="absolute right-[-9px] top-[50%] transform -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-[#6C63FF]"></div>
                      )}
                    </div>
                  </div>
                )
              )
            )
          ) : (
            <p className="text-white text-[16px] text-center">
              Yozishmalar hali mavjud emas...
            </p>
          )
        ) : (
          <p className="text-white text-[16px] text-center">Loading...</p>
        )}
      </div>

      <div className="flex w-full items-center absolute bottom-0 p-4 bg-[#1C2C57] border-t border-gray-500 mt-5">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Type a message..."
          className="block w-full bg-gray-700 text-white p-2 rounded-lg focus:outline-none"
        />
        <button
          disabled={isLoading}
          onClick={sendMessage}
          className="ml-2 bg-[#FFCC15] p-2 rounded-lg"
        >
          <IoSend size={20} color="#1C2C57" />
        </button>
      </div>
    </>
  );
};
