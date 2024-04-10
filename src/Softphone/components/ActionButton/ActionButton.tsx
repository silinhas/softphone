import { IconButtonPropsColorOverrides } from "@mui/material";
import Styles from "./styles";

interface Props extends IconButtonPropsColorOverrides {
  icon: React.ReactNode;
}

export const ActionButton = ({ icon, ...iconButtonProps }: Props) => {
  return <Styles.IconButton {...iconButtonProps}>{icon}</Styles.IconButton>;
};
