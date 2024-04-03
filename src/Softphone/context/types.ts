import { Device } from "@twilio/voice-sdk";

export type Views =
  | "inactive"
  | "active"
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
  alert?: {
    message: string;
    context?: string;
    severity?: "critical" | "regular";
    type: "error" | "warning" | "info" | "success";
  };
};

export type SoftphoneAction = {
  type: "setView" | "setStatus" | "setIdentity" | "setAlert" | "setDevice";
  payload: Partial<InitialState>;
};

export type SoftphoneDispatch = {
  setView: (view: Views) => void;
  setStatus: (status: Status) => void;
  initializeDevice: (identity: string, autoRegister?: boolean) => void;
  setAlert: (alert: InitialState["alert"]) => void;
  clearAlert: () => void;
  destroyDevice: () => void;
};
