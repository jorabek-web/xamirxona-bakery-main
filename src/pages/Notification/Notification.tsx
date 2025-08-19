import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Advance, Message, Suplier } from "./components";
import { Tabs } from "../../components/common";

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
  return (
    <div>
      <header className="flex gap-16 items-center border-b-2 border-b-[#FFCC15] pb-5 px-5 rounded-[30px] mt-3">
        <BsArrowLeftCircleFill
          onClick={() => navigate(-1)}
          size={25}
          color="#FFCC15"
        />
        <h1 className="text-white text-center font-inter text-[25px] font-bold tracking-[1px]">
          Bildirishnoma
        </h1>
      </header>

      <div className="mx-5 mt-10">
        <Tabs
          contentClassName="mt-[20px]"
          tabs={[
            {
              label: "Xabarnoma",
              children: <Message />,
            },
            {
              label: "Avans",
              children: <Advance />,
            },
            {
              label: "Taminotchi",
              children: <Suplier />,
            },
          ]}
          defaultTabIndex={0}
        />
      </div>
    </div>
  );
};
