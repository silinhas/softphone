import {
  useSoftphoneDispatch,
  useSoftphone as useInternalSoftphone,
} from "../context/context";
import { Contact, ContactInput } from "../types";

export const useSoftphone = () => {
  const {
    contact: registeredContact,
    device,
    contactList,
  } = useInternalSoftphone();
  const { destroyDevice, selectContact, setAlert } = useSoftphoneDispatch();

  const lookupContact = (contactToLookup: string | ContactInput) => {
    if (!registeredContact?.identity || device?.state === "destroyed") {
      setAlert({
        message: "The softphone is not ready to make calls.",
        severity: "critical",
        type: "error",
        context:
          "lookupContact failed. Identity is missing or device.state is destroyed.",
      });
      return;
    }

    let contact: Contact;

    if (typeof contactToLookup === "string") {
      contact = new Contact({ identity: contactToLookup });
    } else {
      contact = Contact.buildContact(contactToLookup);
    }

    if (contact.identity === registeredContact.identity) {
      setAlert({
        message: "You are registered as this contact.",
        type: "error",
        context: "lookupContact failed. Cannot call yourself.",
      });
      return;
    }

    const existingContact = contactList.find(
      (c) => c.identity === contact.identity
    );

    selectContact(existingContact || contact);
  };

  return {
    destroyDevice,
    lookupContact,
  };
};
