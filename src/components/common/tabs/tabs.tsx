import { useState } from "react";
import { Props } from "./types";
import { cn } from "../../../lib/utils";

export const Tabs: React.FC<Props> = ({
  tabs,
  defaultTabIndex = 0,
  contentClassName,
  tabsClassName,
  tabClassName,
}) => {
  const [activeTabIdx, setActiveTabIdx] = useState(defaultTabIndex);

  if (!tabs?.length) {
    return null; // Agar tabs bo‘lmasa, hech narsa qaytarmaydi
  }

  return (
    <div className="max-w-full">
      {/* Tabs */}
      <div className={tabsClassName}>
        <div className="w-full overflow-x-auto">
          <div className={cn("flex bg-white rounded-lg", tabClassName)}>
            {tabs.map((tab, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setActiveTabIdx(index)}
                className={cn(
                  "flex-1 duration-150 ease-in-out text-main rounded-lg px-4 py-2 flex items-center justify-center text-[15px] font-bold leading-[130%]",
                  activeTabIdx === index ? "bg-yellow" : "bg-white",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tablar kontenti */}
      {tabs[activeTabIdx]?.children && (
        <div className={contentClassName}>{tabs[activeTabIdx].children}</div>
      )}
    </div>
  );
};
