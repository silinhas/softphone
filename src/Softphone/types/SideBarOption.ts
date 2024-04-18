import { ContainerStyles } from "../components/Container/styles";

export type SideBarOption = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

export interface SideBarProps {
  styles?: ContainerStyles;
  options?: SideBarOption[];
}
