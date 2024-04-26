import { IconButtonProps } from "@mui/material";
import Styles from "./styles";

interface Props extends IconButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  loading?: boolean;
}

export const ActionButton = ({
  icon,
  active = false,
  loading = false,
  ...iconButtonProps
}: Props) => {
  return (
    <Styles.IconButton
      active={`${active}`}
      loading={`${loading}`}
      {...iconButtonProps}
      disabled={loading || iconButtonProps.disabled}
    >
      {icon}
    </Styles.IconButton>
  );
};
