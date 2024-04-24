import { ActionButton, CallLoadingIndicator } from "@/Softphone/components";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { Stack } from "@/Softphone/layouts/Stack";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/Softphone/context";
import { Avatar, Box, Typography } from "@mui/material";

const RingingView = () => {
  const { contactSelected } = useSoftphone();
  const { hangUp } = useSoftphoneDispatch();

  if (!contactSelected) return null;

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
              alt={contactSelected.label}
              sx={{ width: 30, height: 30, border: "1px solid" }}
              src={contactSelected.avatar}
            />
            <Typography variant="body1" fontWeight={400}>
              {contactSelected?.label}
            </Typography>
          </Box>
          <CallLoadingIndicator />
        </Box>
      </Stack.Segment>
      <Stack.Segment flex={0.3}>
        <ActionButton
          color="error"
          onClick={hangUp}
          icon={<CallEndIcon fontSize="large" />}
        />
      </Stack.Segment>
    </Stack>
  );
};

export default RingingView;
