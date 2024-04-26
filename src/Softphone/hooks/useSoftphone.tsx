import {
  useSoftphoneDispatch,
  useSoftphone as _useSoftphone,
} from "../context/Softphone/context";
import { CallAction, ContactInput } from "../types";

export const useSoftphone = () => {
  const { device, call } = _useSoftphone();
  const {
    selectContact,
    makeCall: _makeCall,
    updateCallAction: _updateCallAction,
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
    lookupContact,
    makeCall,
    updateCallAction,
  };
};
