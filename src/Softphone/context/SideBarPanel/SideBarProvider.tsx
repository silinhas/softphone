import { useState } from "react";
import { SideBarContext } from "./context";
import { SideBarOption } from "@/Softphone/types";

export const SideBarProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<SideBarOption[]>();
  const [activePanel, setActivePanel] = useState<SideBarOption>();

  const updateOptions = (options: SideBarOption[]) => {
    setOptions(options);
  };

  const openSideBar = (id: SideBarOption["id"]) => {
    const panelToOpen = options?.find((option) => option.id === id);
    if (!panelToOpen) return;

    setOpen(true);
    setTimeout(() => {
      setActivePanel(panelToOpen);
    }, 200);
  };

  const closeSideBar = () => {
    setOpen(false);
    setActivePanel(undefined);
  };

  return (
    <SideBarContext.Provider
      value={{
        open,
        activePanel,
        openSideBar,
        closeSideBar,
        updateOptions,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};
