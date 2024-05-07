import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import Styles from "./styles";
import { Contact, Handlers } from "@/Softphone/types";

interface Props {
  contact: Contact;
  onRenderContact?: Handlers["onRenderContact"];
}

export const ContactUI = ({ onRenderContact, contact }: Props) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
    >
      <Box position={"relative"}>
        <Avatar
          alt={contact.label}
          sx={{
            height: 80,
            width: 80,
            fontSize: 40,
            border: "1px solid ",
          }}
          src={contact.avatar || "/"}
        >
          {contact.type === "phone" && <PhoneIcon sx={{ fontSize: 40 }} />}
        </Avatar>
        <Tooltip title={contact.status.label} placement="right">
          <Styles.StyledBadge color={contact.status.color} />
        </Tooltip>
      </Box>
      <Typography variant="body1" fontWeight={400}>
        {contact.label}
      </Typography>
      {onRenderContact?.(contact)}
    </Box>
  );
};
