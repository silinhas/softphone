import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import Styles from "./styles";
import { Contact, Handlers } from "@/Softphone/types";

interface Props {
  onRenderContact?: Handlers["onRenderContact"];
  contactSelected: Contact;
}

export const ContactUI = ({ onRenderContact, contactSelected }: Props) => {
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
