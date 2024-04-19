import { SideBarOption } from "@/Softphone/types";
import { createContext, useContext } from "react";

interface InitialState {
  open: boolean;
  activePanel?: SideBarOption | undefined;
  openSideBar: (id: SideBarOption["id"]) => void;
  closeSideBar: () => void;
  updateOptions: (options: SideBarOption[]) => void;
}

const INITIAL_STATE = {
  open: false,
  activePanel: undefined,
  openSideBar: () => {},
  closeSideBar: () => {},
  updateOptions: () => {},
};

export const SideBarContext = createContext<InitialState>(INITIAL_STATE);

export function useSideBar() {
  return useContext(SideBarContext);
}
