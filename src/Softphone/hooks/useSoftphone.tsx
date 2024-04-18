import { useSoftphoneDispatch } from "../context/context";
import { ContactInput } from "../types";

export const useSoftphone = () => {
  const {
    destroyDevice,
    selectContact,
    makeCall: _makeCall,
  } = useSoftphoneDispatch();

  const lookupContact = (contactToLookup: ContactInput) => {
    selectContact(contactToLookup);
  };

  const makeCall = ({
    contact,
    params,
  }: {
    contact?: ContactInput;
    params?: Record<string, unknown>;
  }) => {
    _makeCall(contact, params);
  };

  return {
    destroyDevice,
    lookupContact,
    makeCall,
  };
};
