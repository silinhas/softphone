import { Call } from "@twilio/voice-sdk";
import { ContactInput } from "./Contact";
import { InitialState, Status } from "../context/Softphone/types";

export type CallActions = {
  mute?: boolean;
  hold?: boolean;
  keypad?: boolean;
  transfer?: boolean;
};

export type Handlers = {
  onLookupContact?: (contactToLookup: string) => Promise<ContactInput[]>;
  onClickMakeCallButton?: (contact: ContactInput) => void;
  onClickHoldCallButton?: (call: Call) => void;
  onClickTransferCallButton?: (call: Call) => void;
};

export type EventContext = {
  device: InitialState["device"];
  call: InitialState["call"];
  contact: InitialState["contact"];
  contactSelected: InitialState["contactSelected"];
  status: InitialState["status"];
  view: InitialState["view"];
};

export type Events = {
  onFetchToken: (identity: string, context: EventContext) => Promise<string>;
  onChangeStatus?: (status: Status, context: EventContext) => void;
  onIncomingCall?: (
    call: Call,
    context: EventContext
  ) => ContactInput | undefined;
};
