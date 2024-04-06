import {
  useSoftphoneDispatch,
  useSoftphone as useInternalSoftphone,
} from "../context/context";
import { Contact } from "../context/types";

export const useSoftphone = () => {
  const softphone = useInternalSoftphone();
  const { destroyDevice, selectContact, setAlert } = useSoftphoneDispatch();

  const lookupContact = (contact: Contact) => {
    if (softphone.identity && softphone.device?.state !== "destroyed") {
      selectContact(contact);
    } else {
      setAlert({
        message: "The softphone is not ready to make calls.",
        type: "error",
        context:
          "lookupContact failed. Identity is missing or device.state is destroyed.",
      });
    }
  };

  return {
    destroyDevice,
    lookupContact,
  };
};
