import {
  Avatar,
  Box,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/Softphone/context";
import Styles from "./styles";
import { Handlers } from "@/Softphone/types";
import { Refresh } from "@mui/icons-material";

interface Props {
  onRenderContact?: Handlers["onRenderContact"];
}

export const Contact = ({ onRenderContact }: Props) => {
  const { contactSelected } = useSoftphone();
  const { refreshContact } = useSoftphoneDispatch();

  const handleRefreshContact = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    refreshContact();
  };

  if (!contactSelected) {
    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
      >
        <Skeleton variant="circular" width={120} height={120} />
        <IconButton onClick={handleRefreshContact} color="primary">
          <Refresh fontSize="medium" />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
    >
      <Box position={"relative"}>
        <Avatar
          alt={contactSelected.label}
          sx={{
            height: 80,
            width: 80,
            fontSize: 40,
            border: "1px solid ",
          }}
          src={contactSelected.avatar || "/"}
        >
          {contactSelected.type === "phone" && (
            <PhoneIcon sx={{ fontSize: 40 }} />
          )}
        </Avatar>
        <Tooltip title={contactSelected.status.label} placement="right">
          <Styles.StyledBadge color={contactSelected.status.color} />
        </Tooltip>
      </Box>
      <Typography variant="body1" fontWeight={400}>
        {contactSelected.label}
      </Typography>
      {onRenderContact?.(contactSelected)}
    </Box>
  );
};
