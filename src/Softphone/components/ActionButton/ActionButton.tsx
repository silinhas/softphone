import { IconButtonProps } from "@mui/material";
import Styles from "./styles";

interface Props extends IconButtonProps {
  icon: React.ReactNode;
}

export const ActionButton = ({ icon, ...iconButtonProps }: Props) => {
  return (
    <Styles.IconButton
      {...iconButtonProps}
      sx={{
        border: "1px solid",
        transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
        ":hover": {
          color: (theme) => theme.palette.common.white,
          backgroundColor: (theme) => theme.palette.info.dark,
        },
      }}
    >
      {icon}
    </Styles.IconButton>
  );
};
