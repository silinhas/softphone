import {
  useSoftphoneDispatch,
  useSoftphone as useInternalSoftphone,
} from "../context/context";
import { Contact, ContactInput } from "../types";

export const useSoftphone = () => {
  const {
    contact: contactRegistered,
    device,
    contactSelected,
  } = useInternalSoftphone();
  const {
    destroyDevice,
    selectContact,
    setAlert,
    makeCall: _makeCall,
  } = useSoftphoneDispatch();

  const lookupContact = (contactToLookup: string | ContactInput) => {
    if (!contactRegistered?.identity || device?.state === "destroyed") {
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

    if (contact.identity === contactRegistered.identity) {
      setAlert({
        message: "You are registered as this contact.",
        type: "error",
        context: "lookupContact failed. Cannot call yourself.",
      });
      return;
    }

    selectContact(contact);
  };

  const makeCall = (
    contact: ContactInput,
    params?: Record<string, unknown>
  ) => {
    if (!contactRegistered?.identity || device?.state === "destroyed") {
      setAlert({
        message: "The softphone is not ready to make calls.",
        severity: "critical",
        type: "error",
        context:
          "makeCall failed. Identity is missing or device.state is destroyed.",
      });
      return;
    }

    if (contact.identity === contactRegistered.identity) {
      setAlert({
        message: "You are registered as this contact.",
        type: "error",
        context: "makeCall failed. Cannot call yourself.",
      });
      return;
    }

    if (device?.isBusy) {
      setAlert({
        message: "The device is busy.",
        type: "error",
        context: "makeCall failed. The device is busy.",
      });
      return;
    }

    const _contact = Contact.buildContact(contact);

    // selectContact(_contact);
    _makeCall(_contact, params);
  };

  return {
    contactRegistered,
    contactSelected,
    destroyDevice,
    lookupContact,
    makeCall,
  };
};
