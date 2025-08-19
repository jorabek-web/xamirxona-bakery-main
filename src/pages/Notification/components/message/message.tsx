
import { FaRegClock } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { useGetNotificationsQuery } from "../../../../app/api";

export const Message = () => {
  const userId = localStorage.getItem("userId") || "";
  const {
    data: notifications,
    // refetch,
  } = useGetNotificationsQuery({
    id: userId,
  });

  // useEffect(() => {
  //   const handleNotification = () => refetch();
  //   socket.on("notification", handleNotification);
  //   return () => {
  //     socket.off("notification", handleNotification);
  //   };
  // }, []);

  return (
    <div>
      <div className="text-white space-y-3">
        {notifications ? (
          notifications?.length ? (
            notifications.map((item) => (
              <div
                key={item._id}
                className="rounded-[12px] border-[2px] border-[#FFCC15] p-[10px] text-white"
              >
                <p className="text-[20px] font-[600] mb-2">{item.title}</p>
                <div className="flex items-start justify-between gap-2 py-[10px]">
                  <p className="text-[16px] font-[400]">{item.body}</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-x-2">
                      <LuCalendarDays size={20} />
                      <p className="text-[10px] font-[400]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <FaRegClock size={20} />
                      <p className="text-[10px] font-[400]">
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">
              hozircha bildirishnomalar mavjud emas
            </p>
          )
        ) : (
          <p className="text-center text-white">Loading...</p>
        )}
      </div>
    </div>
  );
};
