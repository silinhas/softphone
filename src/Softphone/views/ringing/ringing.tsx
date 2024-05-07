import {
  ActionButton,
  CallLoadingIndicator,
  ContactListItem,
} from "@/Softphone/components";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { Stack } from "@/Softphone/layouts/Stack";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/Softphone/context";
import { Box } from "@mui/material";

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
            <ContactListItem contact={contactSelected} />
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
