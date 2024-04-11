import { IconButtonProps } from "@mui/material";
import Styles from "./styles";

interface Props extends IconButtonProps {
  icon: React.ReactNode;
  active?: boolean;
}

export const ActionButton = ({
  icon,
  active = false,
  ...iconButtonProps
}: Props) => {
  return (
    <Styles.IconButton active={`${active}`} {...iconButtonProps}>
      {icon}
    </Styles.IconButton>
  );
};
