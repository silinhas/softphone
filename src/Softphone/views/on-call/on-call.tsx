import {
  ActionButton,
  Contact,
  Keypad,
  TimeIndicator,
} from "@/Softphone/components";
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
import { Box, Tooltip } from "@mui/material";
import { Mic } from "@mui/icons-material";
import { useState } from "react";
import { Actions } from "@/Softphone/types";

interface Props {
  onClickTransferCallButton: Actions["onClickTransferCallButton"];
  onClickHoldCallButton: Actions["onClickHoldCallButton"];
}

const OnCallView = ({
  onClickTransferCallButton,
  onClickHoldCallButton,
}: Props) => {
  const { callActions, call } = useSoftphone();
  const { hangUp, setAlert } = useSoftphoneDispatch();
  const [showKeypad, setShowKeypad] = useState(false);

  const handleMute = () => {
    call?.mute(!call.isMuted());
  };

  const handleShowKeypad = () => {
    setShowKeypad(!showKeypad);
  };

  const handleClickHoldCallButton = () => {
    if (onClickHoldCallButton && call) {
      onClickHoldCallButton(call);
      return;
    }

    setAlert({
      type: "error",
      message: "Hold Call action is not available.",
      context: `The Hold Call action is not available.`,
    });
  };

  const handleClickTransferCallButton = () => {
    if (onClickTransferCallButton && call) {
      onClickTransferCallButton(call);
      return;
    }

    setAlert({
      type: "error",
      message: "Transfer Call action is not available.",
      context: `The Transfer Call action is not available.`,
    });
  };

  return (
    <Stack>
      <Stack.Segment flex={0.1} display={"flex"} justifyContent={"center"}>
        <TimeIndicator />
      </Stack.Segment>
      <Stack.Segment
        flex={0.7}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          {showKeypad ? <Keypad /> : <Contact />}
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
                  onClick={handleClickHoldCallButton}
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
                  onClick={handleClickTransferCallButton}
                  icon={<PhoneForwardedIcon fontSize="large" />}
                />
              </span>
            </Tooltip>
          )}
          <Tooltip title="Hang Up">
            <span>
              <ActionButton
                active
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
