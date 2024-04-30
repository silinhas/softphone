import {
  ActionButton,
  ContactUI,
  Keypad,
  TimeIndicator,
} from "@/Softphone/components";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicOffIcon from "@mui/icons-material/MicOff";
import DialpadIcon from "@mui/icons-material/Dialpad";
import { Stack } from "@/Softphone/layouts/Stack";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/Softphone/context";
import { Box, Tooltip } from "@mui/material";
import { Mic } from "@mui/icons-material";
import { useState } from "react";
import { CallAction, Handlers } from "@/Softphone/types";

interface Props {
  onRenderContact?: Handlers["onRenderContact"];
  callActions?: CallAction[];
}

const OnCallView = ({ onRenderContact, callActions }: Props) => {
  const { call, callActions: _callActions, contactSelected } = useSoftphone();
  const { hangUp } = useSoftphoneDispatch();
  const [showKeypad, setShowKeypad] = useState(false);

  const handleMute = () => {
    call?.mute(!call.isMuted());
  };

  const handleShowKeypad = () => {
    setShowKeypad(!showKeypad);
  };

  const handleCallActionClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    action: CallAction
  ) => {
    event.preventDefault();

    const callAction = callActions?.find(
      (callAction) => callAction.id === action.id
    );

    if (callAction) {
      callAction.onClick(action, call!);
    } else {
      action.onClick(action, call!);
    }
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
          {showKeypad ? (
            <Keypad />
          ) : (
            <ContactUI
              contact={contactSelected!}
              onRenderContact={onRenderContact}
            />
          )}
        </Box>
      </Stack.Segment>
      <Stack.Segment flex={0.3}>
        <Box display={"flex"} gap={1} justifyContent={"center"}>
          {_callActions?.map((action) => (
            <Tooltip title={action.label} key={action.id}>
              <span>
                <ActionButton
                  color="primary"
                  onClick={(e) => handleCallActionClick(e, action)}
                  icon={action.icon}
                  disabled={action.disabled}
                  loading={action.loading}
                />
              </span>
            </Tooltip>
          ))}
          <Tooltip title="Keypad">
            <span>
              <ActionButton
                color="primary"
                onClick={handleShowKeypad}
                icon={<DialpadIcon fontSize="large" />}
              />
            </span>
          </Tooltip>
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
