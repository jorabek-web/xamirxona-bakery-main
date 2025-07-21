import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { FaCalendarAlt } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationMutation,
} from "../../app/api";
import dayjs from "dayjs";
import { StatusNo } from "../../constants";
import { toast } from "react-hot-toast";

interface Notification {
  _id: string;
  from: {
    fullName: string;
  };
  createdAt: string;
  status: string;
}

export const Notification = () => {
  const navigate = useNavigate();
  const { data: notifications } = useGetAllNotificationsQuery();
  const [updateNotification] = useUpdateNotificationMutation();

  console.log(notifications);
  return (
    <div>
      <header className="flex gap-16 items-center border-b-2 border-b-[#FFCC15] pb-5 px-5 rounded-[30px] mt-3">
        <BsArrowLeftCircleFill
          onClick={() => navigate("/home")}
          size={25}
          color="#FFCC15"
        />
        <h1 className="text-white text-center font-inter text-[25px] font-bold tracking-[1px]">
          Bildirishnoma
        </h1>
      </header>
      <div className="mt-10 px-4 mb-5">
        {notifications?.length ? (
          notifications
            .filter((item) => item.status === "PENDING")
            .map((notification) => (
              <Card
                key={notification?._id}
                className="border-2 border-solid border-[#FFCC15] bg-transparent text-white mt-4"
              >
                <CardHeader>
                  <CardTitle className="mb-2 font-bold text-[20px] tracking-[1px]">
                    {notification?.from?.fullName || "Noma'lum foydalanuvchi"}
                  </CardTitle>
                  <CardDescription className="text-white flex justify-between">
                    <div className="flex">
                      <FaCalendarAlt className="mr-2" size={20} />
                      <time>
                        {dayjs(notification?.createdAt).format("DD.MM.YYYY")}
                      </time>
                    </div>
                    <div className="flex">
                      <CiClock2 className="mr-2" size={20} />
                      <time>
                        {dayjs(notification?.createdAt).format("HH:mm:ss")}
                      </time>
                    </div>
                    <div className="font-bold text-[15px]">
                      {notification.status === "warehouse"
                        ? `${notification} qob un`
                        : ""}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button
                    className="bg-[#DB141C] text-white font-[500px] hover:bg-[#B31219]"
                    onClick={async () => {
                      try {
                        await updateNotification({
                          body: { status: StatusNo.REJECTED },
                          id: notification._id,
                        }).unwrap();
                        toast.success("Bildirishnoma qabul qilindi!");
                      } catch (error: any) {
                        toast.error(error.message);
                      }
                    }}
                  >
                    Bekor qilish
                  </Button>
                  <Button
                    className="bg-[#099431] hover:bg-[#077D27] text-white font-[500px]"
                    onClick={async () => {
                      try {
                        await updateNotification({
                          body: { status: StatusNo.ACCEPTED },
                          id: notification._id,
                        }).unwrap();
                        toast.success("Bildirishnoma qabul qilindi!");
                      } catch (error: any) {
                        toast.error(error.message);
                      }
                    }}
                  >
                    Qabul qilish
                  </Button>
                </CardFooter>
              </Card>
            ))
        ) : (
          <div className="text-white text-center mt-5 text-lg">
            Bildirishnoma yo‘q
          </div>
        )}
        {notifications?.length && (
          <div className="mt-10">
            <h2 className="text-[#FFCC15] text-xl font-bold mb-4">
              Qabul qilingan bildirishnomalar
            </h2>
            {notifications
              .filter((item) => item.status === "ACCEPTED")
              .map((notification) => (
                <Card
                  key={notification._id}
                  className="border-2 border-solid border-[#FFCC15] bg-transparent text-white mt-4"
                >
                  <CardHeader>
                    <CardTitle className="font-bold text-[20px] tracking-[1px]">
                      {notification?.from?.fullName || "Noma'lum foydalanuvchi"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white flex justify-between">
                      <div className="flex">
                        <FaCalendarAlt className="mr-2" size={20} />
                        <time>
                          {dayjs(notification?.createdAt).format("DD.MM.YYYY")}
                        </time>
                      </div>
                      <div className="flex">
                        <CiClock2 className="mr-2" size={20} />
                        <time>
                          {dayjs(notification?.createdAt).format("HH:mm:ss")}
                        </time>
                      </div>
                      <div className="font-bold text-[15px]">
                        {notification.type === "DOUGHS"
                          ? notification.doughs.length
                          : notification.type === "WAREHOUSE" ||
                            notification.type === "SUPPLY"
                          ? notification?.warehouse?.count
                          : ""}{" "}
                        ta
                      </div>
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
