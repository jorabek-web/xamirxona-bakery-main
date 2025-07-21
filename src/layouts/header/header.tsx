import { IoMdNotifications } from "react-icons/io";
export const Header = () => {
    return(
        <header className="flex justify-center items-center border-b-2 border-b-[#FFCC15] pb-5 rounded-[30px] mt-3">
            <h1 className="text-white text-center font-inter text-[25px] font-bold tracking-[1px]">Jo'raboyeva</h1>
            <IoMdNotifications className="relative left-[80px]" size={25}  color="#FFCC15" />
        </header> 
    )
}