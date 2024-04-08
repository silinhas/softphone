import { Device } from "@twilio/voice-sdk";
import { Contact, ContactConstructorArgs } from "../types/";

export type Views =
  | "inactive"
  | "active"
  | "lookup"
  | "contact"
  | "on-call"
  | "ringing"
  | "dialing"
  | "connecting"
  | "connected"
  | "error";

export type Status = "available" | "do-not-disturb";

export type InitialState = {
  device?: Device;
  view: Views;
  status: Status;
  identity: string;
  contactSelected?: Contact;
  contactList: Contact[];
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
    | "setIdentity"
    | "setAlert"
    | "setDevice"
    | "selectContact"
    | "setContactList";
  payload: Partial<InitialState>;
};

export type SoftphoneDispatch = {
  setView: (view: Views) => void;
  setStatus: (status: Status) => void;
  initializeDevice: (identity: string, autoRegister?: boolean) => void;
  setAlert: (alert: InitialState["alert"]) => void;
  clearAlert: () => void;
  destroyDevice: () => void;
  selectContact: (contact: Contact) => void;
  clearSelectedContact: () => void;
  setContactList: (contactList: (Contact | ContactConstructorArgs)[]) => void;
};
