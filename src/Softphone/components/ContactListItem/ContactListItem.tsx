import { Avatar, Box, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import PhoneIcon from "@mui/icons-material/Phone";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { Contact } from "@/Softphone/types";

interface ContactListItemProps {
  contact: Contact;
}

export const ContactListItem = ({ contact }: ContactListItemProps) => {
  return (
    <Box display={"flex"} gap={1} alignItems={"center"}>
      <Box component={"span"}>
        <CircleIcon
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            color: contact.status.color,
          }}
        />
      </Box>
      <Avatar
        src={contact.avatar || "/"}
        alt={contact.label}
        sx={{ width: 24, height: 24 }}
      >
        {contact.type === "phone" && <PhoneIcon sx={{ fontSize: 16 }} />}
      </Avatar>
      <Typography variant="body2" color="textPrimary">
        {contact.label}
      </Typography>
      {contact.isNew && <FiberNewIcon color="success" />}
    </Box>
  );
};
