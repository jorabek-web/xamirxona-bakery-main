import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

// images
import { FaCamera } from "react-icons/fa";
import { IoIosArrowForward, IoMdLock } from "react-icons/io";
import { TbShare2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import {
  useGetSingleUserQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserPasswordMutation,
} from "../../app/api";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { EyeIcon, EyeOff } from "lucide-react";
import { useUploadImageMutation } from "../../app/api/uploadApi";

export const Profile = () => {
  const navigate = useNavigate();
  const { data: user } = useGetSingleUserQuery({});
  const [updateUserPassword] = useUpdateUserPasswordMutation();
  const [updateUserAvatar] = useUpdateUserAvatarMutation();
  // const [updateUser] = useUpdateUserMutation({});
  // const [uploadImage] = useUploadImageMutation();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeImage, setChangeImage] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [uploadImage] = useUploadImageMutation();

  // // change name
  // const handleNameChange = async () => {

  //   const response = await updateUser({
  //     id: user?._id as string,
  //     fullName: changeFullName || user?.fullName,
  //   })
  //   if (response.error) {
  //     toast.error("Full name change failed. Please try again.");
  //     return;
  //   } else {
  //     toast.success("Full name changed successfully!");
  //   }
  //   window.location.reload();
  // }

  const handleImageChange = async () => {
    if (!changeImage) {
      toast.error("Rasm yuklang !");
      return;
    }
    const formData = new FormData();
    formData.append("file", changeImage);

    const url = await uploadImage(formData).unwrap();

    const response = await updateUserAvatar({
      avatar: url,
    });

    if (response.error) {
      toast.error("Rasm yuklanmadi, qaytadan urining !");
      return;
    } else {
      toast.success("Rasm yuklandi !");
    }
    window.location.reload();
  };

  // change username
  // const handleUserNameChange = async () => {
  //   const response = await updateUser({
  //     id: user?._id as string,
  //     username: changeUserName || user?.username,
  //   });
  //   if (response.error) {
  //     toast.error("User name change failed. Please try again.");
  //     return;
  //   } else {
  //     toast.success("User name changed successfully!");
  //   }
  //   handleRemove();
  // }

  // change password
  const handlePasswordChange = async () => {
    if (!password || !newPassword || !confirmPassword) {
      toast.error("Barcha maydonlarni toldiring !");
      return;
    }
    const response = await updateUserPassword({
      oldPassword: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });
    console.log(response);
    if (response.error) {
      toast.error("eski parol yoki yangi parol xato !");
      return;
    } else {
      toast.success("Parol yangilandi !");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    handleRemove();
  };

  // handle logout
  const handleRemove = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("selectedBranchId");
    navigate("/login");
  };

  // default avatar img
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
      <header className="gap-5 border-b-2 border-b-[#FFCC15] pb-8 px-5 rounded-[30px] mt-5">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex items-center gap-4">
          <Avatar className="w-[116px] h-[116px]">
            <AvatarImage
              width={116}
              height={116}
              src={getAvatarUrl(user?.avatar)}
            />
          </Avatar>
          <h1 className=" text-white text-center font-inter text-[20px] font-bold tracking-[1px]">
            {user?.fullName}
          </h1>
        </div>

        {/* <button className="w-14 h-14 p-[12px] rounded-[25px] absolute top-20 left-24 bg-[#677294CC]">
          <FaCamera className="" size={30} color="white" />
        </button> */}

        <Dialog>
          <DialogTrigger asChild>
            <button className="w-14 h-14 p-[12px] rounded-[25px] absolute top-20 left-24 bg-[#677294CC]">
              <FaCamera className="" size={30} color="white" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-[#1C2C57]">
            <DialogHeader>
              <DialogTitle className="text-[#FFCC15] font-bold text-[20px]">
                Rasimni o'zgartirish
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-start gap-2">
                <Label
                  htmlFor="username"
                  className="text-right text-[#FFCC15] font-bold text-[15px]"
                >
                  Rasimni o'zgartirish
                </Label>
                <Input
                  id="image"
                  className="col-span-3 !border-[#1C2C57] border-2 border-solid"
                  type="file"
                  onChange={(e) => setChangeImage(e.target.files?.[0] || null)}
                  accept="image/*"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleImageChange}
                type="submit"
                className="bg-[#FFCC15] text-[#1C2C57]"
              >
                Saqlash
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <div className="px-4 mt-5">
        {/* <Drawer>
          <DrawerTrigger className="w-full text-white text-center font-inter text-[25px] font-bold tracking-[1px] mt-2 flex items-center gap-2">
            <button className="w-full  bg-white p-3 rounded-lg flex items-center gap-5 border-2 border-solid border-yellow-400 mb-4">
              <FaRegEdit size={20} color="#1C2C57" />
              <span className="text-[#1C2C57] font-bold text-[15px]">
                Usernameni o'zgartirish
              </span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-[#1C2C57] rounded-[20px] border-none h-60">
            <DrawerHeader className="">
              <DrawerDescription className="">
                <span className="text-white text-start block font-bold text-[15px] mb-2">
                  Usernameni o'zgartirish
                </span>
                <Input
                  id="username"
                  className="col-span-3 border-yellow-400 text-black"
                  onChange={(e) => setChangeUsername(e.target.value)}
                  defaultValue={user?.username}
                />
                <Button
                  onClick={handleUserNameChange}
                  className="w-full text-[#1C2C57] bg-[#FFCC15] mt-10 font-bold text-[15px] hover:bg-[#FFCC15]"
                >
                  O'zgartirish
                </Button>
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer> */}

        <div className="w-full text-white text-center font-inter text-[25px] font-bold tracking-[1px] flex items-center gap-2">
          <button
            className="w-full bg-white p-3 rounded-lg flex items-center gap-5 border-2 border-solid border-yellow-400 mb-4"
            onClick={() => navigate("/salaries")}
          >
            <span className="text-[#1C2C57] font-bold text-[15px]">
              Maoshlarim
            </span>
            <span className="bg-[#1C2C57] p-1 px-1.5 rounded-md absolute t-[50%] right-8">
              <IoIosArrowForward color="#FFCC15" />
            </span>
          </button>
        </div>

        <Drawer>
          <DrawerTrigger className="w-full text-white text-center font-inter text-[25px] font-bold tracking-[1px] flex items-center gap-2">
            <button className="w-full bg-white p-3 rounded-lg flex items-center gap-5 border-2 border-solid border-yellow-400 mb-4">
              <IoMdLock size={20} color="#1C2C57" />
              <span className="text-[#1C2C57] font-bold text-[15px]">
                Profile parolini o'zgartirish
              </span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-[#1C2C57] rounded-t-[20px] border-none ">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-start gap-2 px-4">
                <Label
                  htmlFor="password"
                  className="text-right text-white font-bold text-[15px]"
                >
                  Eski parol
                </Label>
                <div className="relative w-full">
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="old password"
                    type={showPassword["password"] ? "text" : "password"}
                    className="col-span-3 border-yellow-400 text-black"
                  />
                  <div
                    className="absolute top-[50%] right-5 z-10 transform -translate-y-1/2"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        ["password"]: !prev["password"],
                      }))
                    }
                  >
                    {!showPassword["password"] ? (
                      <EyeOff className="text-black opacity-50" fill="none" />
                    ) : (
                      <EyeIcon className="text-black opacity-50" fill="none" />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 px-4">
                <Label
                  htmlFor="newpassword"
                  className="text-right text-white font-bold text-[15px]"
                >
                  Yangi parol
                </Label>
                <div className="relative w-full">
                  <Input
                    onChange={(e) => setNewPassword(e.target.value)}
                    id="newpassword"
                    placeholder="new password"
                    type={showPassword["newpassword"] ? "text" : "password"}
                    className="col-span-3 border-yellow-400 text-black"
                  />
                  <div
                    className="absolute top-[50%] right-5 z-10 transform -translate-y-1/2"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        ["newpassword"]: !prev["newpassword"],
                      }))
                    }
                  >
                    {!showPassword["newpassword"] ? (
                      <EyeOff className="text-black opacity-50" fill="none" />
                    ) : (
                      <EyeIcon className="text-black opacity-50" fill="none" />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 px-4">
                <Label
                  htmlFor="username"
                  className="text-right text-white font-bold text-[15px]"
                >
                  Yangi parolni tasdiqlash
                </Label>
                <div className="relative w-full">
                  <Input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="username"
                    placeholder="confirm password"
                    type={showPassword["username"] ? "text" : "password"}
                    className="col-span-3 border-yellow-400 text-black"
                  />
                  <div
                    className="absolute top-[50%] right-5 z-10 transform -translate-y-1/2"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        ["username"]: !prev["username"],
                      }))
                    }
                  >
                    {!showPassword["username"] ? (
                      <EyeOff className="text-black opacity-50" fill="none" />
                    ) : (
                      <EyeIcon className="text-black opacity-50" fill="none" />
                    )}
                  </div>
                </div>
              </div>
              <div className="px-4 mt-5">
                <Button
                  onClick={handlePasswordChange}
                  type="submit"
                  className="w-full hover:bg-[#FFCC15] bg-[#FFCC15] text-[#1C2C57] "
                >
                  Saqlash
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="w-full bg-white p-3 rounded-lg flex items-center gap-5 border-2 border-solid border-yellow-400">
              <TbShare2 size={20} color="#1C2C57" />
              <span className="text-[#1C2C57] font-bold text-[15px]">
                Akkountdan Chiqish
              </span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#1C2C57] text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Akkountdan chiqasizmi?</AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex">
              <AlertDialogCancel className="bg-[#FFCC15] hover:bg-[#FFCC15] text-[#1C2C57]">
                Bekor qilish
              </AlertDialogCancel>
              <button
                onClick={handleRemove}
                className="p-2 rounded-lg bg-red-700"
              >
                Chiqish
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};
