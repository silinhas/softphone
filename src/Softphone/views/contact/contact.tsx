import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import { ActionButton, Contact } from "@/Softphone/components";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/context";
import { Stack } from "@/Softphone/layouts/Stack";

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
        <Contact />
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
