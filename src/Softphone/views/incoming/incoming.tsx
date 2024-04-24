import { ActionButton, CallLoadingIndicator } from "@/Softphone/components";
import { useSoftphone } from "@/Softphone/context/Softphone/context";
import { Avatar, Box, Typography } from "@mui/material";
import CallEndIcon from "@mui/icons-material/CallEnd";
import PhoneIcon from "@mui/icons-material/Phone";
import { Stack } from "@/Softphone/layouts/Stack";
import { Handlers } from "@/Softphone/types";

interface Props {
  onRenderIncomingView?: Handlers["onRenderIncomingView"];
}

const IncomingView = ({ onRenderIncomingView }: Props) => {
  const { contactSelected, call } = useSoftphone();

  if (!call || !contactSelected) {
    return null;
  }

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
          <CallLoadingIndicator />
          {onRenderIncomingView?.(contactSelected)}
        </Box>
      </Stack.Segment>
      <Stack.Segment
        flex={0.3}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"baseline"}
        gap={5}
      >
        <ActionButton
          active
          onClick={() => call.reject()}
          color="error"
          icon={<CallEndIcon fontSize="large" />}
        />
        <ActionButton
          active
          color="success"
          onClick={() => call.accept()}
          icon={<PhoneIcon fontSize="large" />}
        />
      </Stack.Segment>
    </Stack>
  );
};
export default IncomingView;
