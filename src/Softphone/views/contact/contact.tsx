import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import { ActionButton } from "@/Softphone/components";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/context";
import { Stack } from "@/Softphone/layouts/Stack";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import Styles from "./contact.styles";

const ContactView = () => {
  const { contactSelected } = useSoftphone();
  const { setView, clearSelectedContact, makeCall } = useSoftphoneDispatch();

  return (
    <Stack>
      <Stack.Segment
        flex={0.7}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {contactSelected && (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={2}
          >
            <Box position={"relative"}>
              <Avatar
                alt={contactSelected.label}
                sx={{ height: 80, width: 80, fontSize: 40 }}
                src="/static/images/avatar/1.jpg"
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
        )}
      </Stack.Segment>
      <Stack.Segment
        flex={0.3}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"baseline"}
        gap={5}
      >
        <ActionButton
          color="primary"
          onClick={() => {
            setView("active");
            clearSelectedContact();
          }}
          icon={<CloseIcon fontSize="large" />}
        />
        <ActionButton
          color="success"
          onClick={() => makeCall(contactSelected)}
          icon={<PhoneIcon fontSize="large" />}
        />
      </Stack.Segment>
    </Stack>
  );
};
export default ContactView;
