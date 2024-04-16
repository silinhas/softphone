import CloseIcon from "@mui/icons-material/Close";
import {
  ActionButton,
  Contact,
  MakeCallToButton,
} from "@/Softphone/components";
import { useSoftphoneDispatch } from "@/Softphone/context/context";
import { Stack } from "@/Softphone/layouts/Stack";

const ContactView = () => {
  const { setView, clearSelectedContact } = useSoftphoneDispatch();

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
        <MakeCallToButton />
      </Stack.Segment>
    </Stack>
  );
};
export default ContactView;
