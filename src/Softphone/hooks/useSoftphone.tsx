import {
  useSoftphoneDispatch,
  useSoftphone as useInternalSoftphone,
} from "../context/context";
import { Contact, type ContactConstructorArgs } from "../types";

export const useSoftphone = () => {
  const softphone = useInternalSoftphone();
  const { destroyDevice, selectContact, setAlert } = useSoftphoneDispatch();

  const lookupContact = (
    contactToLookup: string | ContactConstructorArgs | Contact
  ) => {
    if (softphone.identity && softphone.device?.state !== "destroyed") {
      let contact: Contact;

      if (typeof contactToLookup === "string") {
        contact = new Contact({ identity: contactToLookup });
      } else if (contactToLookup instanceof Contact) {
        contact = contactToLookup;
      } else {
        contact = new Contact(contactToLookup);
      }

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
