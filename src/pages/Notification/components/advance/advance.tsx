import { FaCalendarAlt } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { CiClock2 } from "react-icons/ci";

export const Advance = () => {
  return (
    <div className="space-y-5 mt-12">
      <Card className="border-2 border-solid border-[#FFCC15] bg-transparent text-white mt-4">
        <CardHeader>
          <CardTitle className="font-bold text-[20px] tracking-[1px]">
            Shuhrat Azizov
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-white flex justify-between">
            <div className="flex">
              <FaCalendarAlt className="mr-2" size={20} />
              04.12.2024
            </div>
            <div className="flex">
              <CiClock2 className="mr-2" size={20} />
              9:30
            </div>
            <div className="flex text-[15px]">300 000</div>
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="border-2 border-solid border-[#FFCC15] bg-transparent text-white mt-4">
        <CardHeader>
          <CardTitle className="font-bold text-[20px] tracking-[1px]">
            Shuhrat Azizov
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-white flex justify-between">
            <div className="flex">
              <FaCalendarAlt className="mr-2" size={20} />
              04.12.2024
            </div>
            <div className="flex">
              <CiClock2 className="mr-2" size={20} />
              9:30
            </div>
            <div className="flex text-[15px]">300 000</div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};
