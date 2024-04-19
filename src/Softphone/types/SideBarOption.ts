import { ContainerStyles } from "../components/Container/styles";

export type SideBarOption = {
  id: string;
  title: string;
  position?: "top" | "bottom";
  component: React.ReactNode;
  panelComponent?: React.ReactNode;
};

export interface SideBarProps {
  styles?: ContainerStyles;
  options?: SideBarOption[];
  onClickSideBarOption?: (option: SideBarOption) => void;
}
