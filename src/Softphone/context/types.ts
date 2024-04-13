import { Call, Device } from "@twilio/voice-sdk";
import { Contact, SoftphoneSettings } from "../types";

export type Views =
  | "inactive"
  | "active"
  | "lookup"
  | "contact"
  | "ringing"
  | "on-call"
  | "incoming";

export type Status = "available" | "do-not-disturb";

export type InitialState = {
  device?: Device;
  call?: Call;
  view: Views;
  status: Status;
  contact: Contact;
  contactSelected?: Contact;
  callActions: SoftphoneSettings["callActions"];
  actions: SoftphoneSettings["actions"];
  alert?: {
    message: string;
    context?: string;
    severity?: "critical" | "regular";
    type: "error" | "warning" | "info" | "success";
  };
};

export type SoftphoneAction = {
  type:
    | "setView"
    | "setStatus"
    | "setContact"
    | "setAlert"
    | "setDevice"
    | "setCall"
    | "selectContact"
    | "setCallActions"
    | "setActions";
  payload: Partial<InitialState>;
};

export type SoftphoneDispatch = {
  setView: (view: Views) => void;
  setStatus: (status: Status) => void;
  initializeDevice: (softphoneSettings: SoftphoneSettings) => void;
  setAlert: (alert: InitialState["alert"]) => void;
  clearAlert: () => void;
  destroyDevice: () => void;
  selectContact: (contact: Contact) => void;
  clearSelectedContact: () => void;
  makeCall: (contact?: Contact) => void;
  hangUp: () => void;
};
