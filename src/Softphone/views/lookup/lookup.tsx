import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/material";
import { ActionButton, LookupInput } from "@/Softphone/components";
import { useSoftphoneDispatch } from "@/Softphone/context/Softphone/context";
import { Stack } from "@/Softphone/layouts/Stack";
import { Contact, Handlers } from "@/Softphone/types";

interface Props {
  onLookupContact?: Handlers["onLookupContact"];
}

const LookupView = ({ onLookupContact }: Props) => {
  const { setView } = useSoftphoneDispatch();
  const { selectContact } = useSoftphoneDispatch();

  const onSelectContact = (contact: Contact) => {
    selectContact(contact);
  };

  return (
    <Stack>
      <Stack.Segment
        flex={0.7}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box width={"100%"} mx={4}>
          <LookupInput
            onLookupContact={onLookupContact}
            onSelectContact={onSelectContact}
          />
        </Box>
      </Stack.Segment>
      <Stack.Segment flex={0.3}>
        <ActionButton
          color="primary"
          onClick={() => setView("active")}
          icon={<ArrowBackIcon fontSize="large" />}
        />
      </Stack.Segment>
    </Stack>
  );
};

export default LookupView;
