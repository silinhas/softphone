import {
  useSoftphoneDispatch,
  useSoftphone as _useSoftphone,
} from "../context/Softphone/context";
import { CallAction, ContactInput } from "../types";

export const useSoftphone = () => {
  const { device, call, contact, contactSelected } = _useSoftphone();
  const {
    selectContact,
    makeCall: _makeCall,
    updateCallAction: _updateCallAction,
    setView,
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

  const updateCallAction = (
    callActionId: CallAction["id"],
    { loading, disabled }: { loading?: boolean; disabled?: boolean }
  ) => {
    _updateCallAction(callActionId, { loading, disabled });
  };

  return {
    isBusy: Boolean(device?.isBusy),
    currentCall: call,
    registeredContact: contact,
    contactSelected,
    lookupContact,
    makeCall,
    updateCallAction,
    selectContact,
    setView,
  };
};
