import { Avatar, AvatarImage } from "../../components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
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
  DrawerTrigger,
} from "../../components/ui/drawer";

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

// images
import { FaCamera } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { TbShare2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
} from "../../app/api";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useUploadImageMutation } from "../../app/api/uploadApi";
import { useGetAllExpesesQuery } from "../../app/api/expenseApi";
import dayjs from "dayjs";

export const Profile = () => {
  const navigate = useNavigate();
  const { data: user } = useGetSingleUserQuery({});
  const [updateUserPassword] = useUpdateUserPasswordMutation();
  const [updateUser] = useUpdateUserMutation({});
  const [uploadImage] = useUploadImageMutation();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeImage, setChangeImage] = useState<File | null>(null);
  const { data: salaries } = useGetAllExpesesQuery({});

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
    if (!changeImage) return;
    const formData = new FormData();
    formData.append("file", changeImage);

    const url = await uploadImage(formData).unwrap();
    const response = await updateUser({
      id: user?._id as string,
      avatar: url,
    });
    if (response.error) {
      toast.error("Image change failed. Please try again.");
      return;
    } else {
      toast.success("Image changed successfully!");
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
    const response = await updateUserPassword({
      oldPassword: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });
    if (response.error) {
      toast.error(
        "Password change failed. Check your old password and try again."
      );
      return;
    } else {
      toast.success("Password changed successfully!");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    handleRemove();
  };

  // handle logout
  const handleRemove = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/login");
  };

  return (
    <>
      <header className="gap-5 border-b-2 border-b-[#FFCC15] pb-8 px-5 rounded-[30px] mt-5">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex items-center gap-4">
          <Avatar className="w-[116px] h-[116px]">
            <AvatarImage width={116} height={116} src={user?.avatar} />
          </Avatar>
          <h1 className=" text-white text-center font-inter text-[20px] font-bold tracking-[1px]">
            {user?.fullName}
          </h1>
        </div>
        <button className="w-14 h-14 p-[12px] rounded-[25px] absolute top-20 left-24 bg-[#677294CC]">
          <FaCamera className="" size={30} color="white" />
        </button>
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
      <Accordion type="single" collapsible className=" px-4  mt-14">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline bg-white p-2 rounded-lg border-2 border-yellow-400">
            Maoshlarim
          </AccordionTrigger>
          <AccordionContent className="">
            <div className="flex items-center gap-20 my-2">
              <span className="text-[#FFCC15] text-[14px] font-bold px-4">
                Olingan puli
              </span>
              <span className="text-[#FFCC15] text-[14px] font-bold px-4">
                Sana
              </span>
            </div>

            <Table className="bg-white">
              <TableBody className="border border-yellow-400 rounded-lg">
                {salaries?.map((salary: any) => (
                  <TableRow className="hover:bg-transparent border-b border-b-yellow-400 ">
                    <TableCell className="font-bold text-[15px] text-[#1C2C57]">
                      {salary.amount} sum
                    </TableCell>
                    <TableCell className="font-bold text-[15px] text-[#1C2C57]">
                      {dayjs(salary.createdAt).format("MM.DD.YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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

        <Drawer>
          <DrawerTrigger className="w-full text-white text-center font-inter text-[25px] font-bold tracking-[1px] flex items-center gap-2">
            <button className="w-full bg-white p-3 rounded-lg flex items-center gap-5 border-2 border-solid border-yellow-400 mb-4">
              <IoMdLock size={20} color="#1C2C57" />
              <span className="text-[#1C2C57] font-bold text-[15px]">
                Profile parolini o'zgartirish
              </span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-[#1C2C57] rounded-[20px] border-none ">
            <DrawerDescription className="">
              <div className="grid gap-4 py-4">
                <div className="flex flex-col items-start gap-2 px-4">
                  <Label
                    htmlFor="password"
                    className="text-right text-white font-bold text-[15px]"
                  >
                    Eski parol
                  </Label>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    className="col-span-3 border-yellow-400 text-black"
                  />
                </div>
                <div className="flex flex-col items-start gap-2 px-4">
                  <Label
                    htmlFor="password"
                    className="text-right text-white font-bold text-[15px]"
                  >
                    Yangi parol
                  </Label>
                  <Input
                    onChange={(e) => setNewPassword(e.target.value)}
                    id="password"
                    className="col-span-3 border-yellow-400 text-black"
                  />
                </div>
                <div className="flex flex-col items-start gap-2 px-4">
                  <Label
                    htmlFor="username"
                    className="text-right text-white font-bold text-[15px]"
                  >
                    Yangi parolni tasdiqlash
                  </Label>
                  <Input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="username"
                    className="col-span-3 border-yellow-400 text-black"
                  />
                </div>
                <div className="px-4 mt-5">
                  <Button
                    onClick={handlePasswordChange}
                    type="submit"
                    className="w-full hover:bg-[#FFCC15] bg-[#FFCC15] text-[#1C2C57] "
                  >
                    Save changes
                  </Button>
                </div>
              </div>
            </DrawerDescription>
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
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Akkountdan chiqasizmi?</AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex ">
              <AlertDialogCancel className="bg-[#FFCC15] hover:bg-[#FFCC15] text-[#1C2C57]">
                Bekor qilish
              </AlertDialogCancel>
              <button
                onClick={handleRemove}
                className="border-2 p-2 rounded-lg bg-red-700 text-[#1C2C57]"
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
