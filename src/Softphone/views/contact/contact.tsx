import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import { ActionButton, Contact } from "@/Softphone/components";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/Softphone/context";
import { Stack } from "@/Softphone/layouts/Stack";
import { Handlers } from "@/Softphone/types";

interface Props {
  onClickMakeCallButton?: Handlers["onClickMakeCallButton"];
  onRenderContact?: Handlers["onRenderContact"];
}

const ContactView = ({ onClickMakeCallButton, onRenderContact }: Props) => {
  const { contactSelected } = useSoftphone();
  const { setView, clearSelectedContact, makeCall } = useSoftphoneDispatch();

  const handleMakeCall = () => {
    if (!contactSelected) {
      return;
    }

    if (onClickMakeCallButton) {
      onClickMakeCallButton(contactSelected);
      return;
    }

    makeCall(contactSelected);
  };

  if (!contactSelected) return null;

  return (
    <Stack>
      <Stack.Segment
        flex={0.7}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Contact onRenderContact={onRenderContact} />
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
          active
          color="success"
          onClick={handleMakeCall}
          icon={<PhoneIcon fontSize="large" />}
        />
      </Stack.Segment>
    </Stack>
  );
};
export default ContactView;
