import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { useSoftphone } from "@/Softphone/context/Softphone/context";
import Styles from "./styles";

export const Contact = () => {
  const { contactSelected } = useSoftphone();

  if (!contactSelected) return null;

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
    </Box>
  );
};
