import { useNavigate } from "react-router-dom";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationMutation,
} from "../../../../app/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";
import { CiClock2 } from "react-icons/ci";
import { Button } from "../../../../components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { StatusNo } from "../../../../constants";

export const Suplier = () => {
  const { data: notifications } = useGetAllNotificationsQuery({
    id: localStorage.getItem("selectedBranchId")!,
  });
  const [updateNotification] = useUpdateNotificationMutation();

  console.log(notifications);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-12 mb-5">
        {notifications && notifications.length !== 0 ? (
          notifications
            .filter((item) => item.status === "PENDING")
            .map((notification) => (
              <Card
                key={notification?._id}
                className="border-2 border-solid border-[#FFCC15] bg-transparent text-white mt-4"
              >
                <CardHeader>
                  <CardTitle className="mb-2 font-bold text-[20px] tracking-[1px]">
                    Ta’minotchi
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
                    <div className="flex text-[15px]">
                      {notification?.amount} {notification?.ingredient.scope}{" "}
                      {notification?.ingredient.title}
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

        {notifications && notifications.length !== 0 && (
          <div className="mt-10">
            <h2 className="text-[#FFCC15] text-xl font-bold mb-4">
              Qabul qilingan bildirishnomalar
            </h2>
            {notifications &&
              notifications.length !== 0 &&
              notifications
                .filter((item) => item.status === "ACCEPTED")
                .map((notification) => (
                  <Card
                    key={notification._id}
                    className="border-2 border-solid border-[#FFCC15] bg-transparent text-white mt-4"
                  >
                    <CardHeader>
                      <CardTitle className="font-bold text-[20px] tracking-[1px]">
                        Ta’minotchi
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-white flex justify-between">
                        <div className="flex">
                          <FaCalendarAlt className="mr-2" size={20} />
                          <time>
                            {dayjs(notification?.createdAt).format(
                              "DD.MM.YYYY"
                            )}
                          </time>
                        </div>
                        <div className="flex">
                          <CiClock2 className="mr-2" size={20} />
                          <time>
                            {dayjs(notification?.createdAt).format("HH:mm:ss")}
                          </time>
                        </div>
                        <div className="flex text-[15px]">
                          {notification?.amount}{" "}
                          {notification?.ingredient.scope}{" "}
                          {notification?.ingredient.title}
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
