import {
  useSoftphoneDispatch,
  useSoftphone as useInternalSoftphone,
} from "../context/context";
import { ContactInput } from "../types";

export const useSoftphone = () => {
  const { contact: contactRegistered, contactSelected } =
    useInternalSoftphone();
  const {
    destroyDevice,
    selectContact,
    makeCall: _makeCall,
  } = useSoftphoneDispatch();

  const lookupContact = (contactToLookup: ContactInput) => {
    selectContact(contactToLookup);
  };

  const makeCall = (
    contact: ContactInput,
    params?: Record<string, unknown>
  ) => {
    _makeCall(contact, params);
  };

  return {
    contactRegistered,
    contactSelected,
    destroyDevice,
    lookupContact,
    makeCall,
  };
};
