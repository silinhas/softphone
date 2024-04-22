import {
  useSoftphoneDispatch,
  useSoftphone as _useSoftphone,
} from "../context/Softphone/context";
import { ContactInput } from "../types";

export const useSoftphone = () => {
  const { device, call } = _useSoftphone();
  const { selectContact, makeCall: _makeCall } = useSoftphoneDispatch();

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
    isBusy: Boolean(device?.isBusy),
    currentCall: call,
    lookupContact,
    makeCall,
  };
};
