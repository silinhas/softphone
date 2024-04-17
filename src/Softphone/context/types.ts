import { Call, Device } from "@twilio/voice-sdk";
import { Contact, ContactInput, SoftphoneSettings } from "../types";

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
  selectContact: (contact: ContactInput) => void;
  clearSelectedContact: () => void;
  makeCall: (contact?: ContactInput, params?: Record<string, unknown>) => void;
  hangUp: () => void;
};
