import { Call } from "@twilio/voice-sdk";
import { ContactInput } from "./Contact";
import { InitialState, ContactStatus } from "../context/Softphone/types";

export type Handlers = {
  onLookupContact?: (contactToLookup: string) => Promise<ContactInput[]>;
  onClickMakeCallButton?: (contact: ContactInput) => void;
  onClickHoldCallButton?: (call: Call) => void;
  onClickTransferCallButton?: (call: Call) => void;
  onRenderContact?: (contact: ContactInput) => React.ReactNode | undefined;
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
  onChangeStatus?: (status: ContactStatus, context: EventContext) => void;
  onIncomingCall?: (
    call: Call,
    context: EventContext
  ) => ContactInput | undefined;
};
