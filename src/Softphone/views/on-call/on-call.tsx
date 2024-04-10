import { ActionButton } from "@/Softphone/components";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicOffIcon from "@mui/icons-material/MicOff";
import PhonePausedIcon from "@mui/icons-material/PhonePaused";
import DialpadIcon from "@mui/icons-material/Dialpad";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import { Stack } from "@/Softphone/layouts/Stack";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/context";
import { Avatar, Box, Typography } from "@mui/material";

const OnCallView = () => {
  const { contactSelected } = useSoftphone();
  const { hangUp } = useSoftphoneDispatch();

  return (
    <Stack>
      <Stack.Segment
        flex={0.7}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Avatar
              alt={contactSelected?.label}
              sx={{ width: 30, height: 30, border: "1px solid" }}
              src={contactSelected?.avatar}
            />
            <Typography variant="body1" fontWeight={400}>
              {contactSelected?.label}
            </Typography>
          </Box>
          <>ON_CALL_VIEW</>
        </Box>
      </Stack.Segment>
      <Stack.Segment flex={0.3}>
        <Box display={"flex"} gap={1} justifyContent={"center"}>
          <ActionButton
            color="primary"
            onClick={() => console.log("Mute")}
            icon={<MicOffIcon fontSize="large" />}
          />
          <ActionButton
            color="primary"
            onClick={() => console.log("hold call")}
            icon={<PhonePausedIcon fontSize="large" />}
          />
          <ActionButton
            color="primary"
            onClick={() => console.log("show keypad")}
            icon={<DialpadIcon fontSize="large" />}
          />
          <ActionButton
            color="primary"
            onClick={() => console.log("Transfer Call")}
            icon={<PhoneForwardedIcon fontSize="large" />}
          />
          <ActionButton
            color="error"
            onClick={hangUp}
            icon={<CallEndIcon fontSize="large" />}
          />
        </Box>
      </Stack.Segment>
    </Stack>
  );
};

export default OnCallView;
