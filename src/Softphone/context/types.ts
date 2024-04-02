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
  error?: {
    type: "identity" | "token" | "device" | "general";
    message: string;
    context?: string;
  };
};

export type SoftphoneAction = {
  type: "setView" | "setStatus" | "setIdentity" | "setError" | "setDevice";
  payload: Partial<InitialState>;
};

export type SoftphoneDispatch = {
  setView: (view: Views) => void;
  setStatus: (status: Status) => void;
  initializeDevice: (identity: string) => void;
  setError: (error: InitialState["error"]) => void;
};
