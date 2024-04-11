import { ActionButton, Keypad } from "@/Softphone/components";
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
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { Mic } from "@mui/icons-material";
import { useState } from "react";

const OnCallView = () => {
  const { contactSelected, callActions, call } = useSoftphone();
  const { hangUp } = useSoftphoneDispatch();
  const [showKeypad, setShowKeypad] = useState(false);

  const handleMute = () => {
    call?.mute(!call.isMuted());
  };

  const handleShowKeypad = () => {
    setShowKeypad(!showKeypad);
  };

  return (
    <Stack>
      <Stack.Segment
        flex={0.7}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Box display={"flex"} gap={1}>
            <Avatar
              alt={contactSelected?.label}
              sx={{ width: 30, height: 30, border: "1px solid" }}
              src={contactSelected?.avatar}
            />
            <Typography variant="body1" fontWeight={400}>
              {contactSelected?.label}
            </Typography>
          </Box>
          {showKeypad && <Keypad />}
        </Box>
      </Stack.Segment>
      <Stack.Segment flex={0.3}>
        <Box display={"flex"} gap={1} justifyContent={"center"}>
          {callActions?.mute && (
            <Tooltip title={call?.isMuted() ? "Unmute" : "Mute"}>
              <span>
                <ActionButton
                  active={call?.isMuted()}
                  color="primary"
                  onClick={handleMute}
                  icon={
                    call?.isMuted() ? (
                      <MicOffIcon fontSize="large" />
                    ) : (
                      <Mic fontSize="large" />
                    )
                  }
                />
              </span>
            </Tooltip>
          )}
          {callActions?.hold && (
            <Tooltip title="Hold Call">
              <span>
                <ActionButton
                  color="primary"
                  onClick={() => console.log("hold call")}
                  icon={<PhonePausedIcon fontSize="large" />}
                />
              </span>
            </Tooltip>
          )}
          {callActions?.keypad && (
            <Tooltip title="Keypad">
              <span>
                <ActionButton
                  color="primary"
                  onClick={handleShowKeypad}
                  icon={<DialpadIcon fontSize="large" />}
                />
              </span>
            </Tooltip>
          )}
          {callActions?.transfer && (
            <Tooltip title="Transfer Call">
              <span>
                <ActionButton
                  color="primary"
                  onClick={() => console.log("Transfer Call")}
                  icon={<PhoneForwardedIcon fontSize="large" />}
                />
              </span>
            </Tooltip>
          )}
          <Tooltip title="Hang Up">
            <span>
              <ActionButton
                color="error"
                onClick={hangUp}
                icon={<CallEndIcon fontSize="large" />}
              />
            </span>
          </Tooltip>
        </Box>
      </Stack.Segment>
    </Stack>
  );
};

export default OnCallView;
