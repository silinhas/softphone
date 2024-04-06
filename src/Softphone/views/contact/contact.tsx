import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import { ActionButton } from "@/Softphone/components";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/context";
import { Stack } from "@/Softphone/layouts/Stack";
import { Box } from "@mui/material";

const ContactView = () => {
  const { contactSelected } = useSoftphone();
  const { setView, clearSelectedContact } = useSoftphoneDispatch();

  return (
    <Stack>
      <Stack.Segment
        flex={0.7}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {contactSelected && (
          <Box>
            <h2>Selected Lookup</h2>
            <p>{contactSelected.label}</p>
            <p>{contactSelected.type}</p>
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
          onClick={() => {
            setView("active");
            clearSelectedContact();
          }}
          icon={<CloseIcon fontSize="large" />}
        />
        <ActionButton
          onClick={() => console.log("make call")}
          icon={<PhoneIcon fontSize="large" />}
        />
      </Stack.Segment>
    </Stack>
  );
};
export default ContactView;
