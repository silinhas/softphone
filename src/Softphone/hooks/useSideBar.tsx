import { useSideBar as _useSideBar } from "@/Softphone/context/SideBarPanel/context";

export const useSideBar = () => {
  const { openSideBar } = _useSideBar();

  return {
    openSideBar,
  };
};
