import { Device } from "@twilio/voice-sdk";
import { InitialState, SoftphoneDispatch, Status } from "./types";
import { Contact } from "@/Softphone/types";

export const STATUS: { value: Status; label: string; color: string }[] = [
  { value: "available", label: "Available", color: "#3498db" },
  { value: "do-not-disturb", label: "Do not Disturb", color: "#e74c3c" },
];

export const INITIAL_STATE: InitialState = {
  view: "active",
  status: "do-not-disturb",
  contact: new Contact({ identity: "" }),
};

export const SOFTPHONE_DISPATCH: SoftphoneDispatch = {
  setView: () => {},
  setStatus: () => {},
  setAlert: () => {},
  clearAlert: () => {},
  initializeDevice: () => {},
  destroyDevice: () => {},
  selectContact: () => {},
  clearSelectedContact: () => {},
  makeCall: () => {},
  hangUp: () => {},
  refreshContact: () => {},
};

export const TIME_TO_CHECK_CALL_TO_UPDATE_TOKEN = 300000; // each 5 min;
const TIME_TO_CHECK_TOKEN_WILL_EXPIRE = 7200000; // 2 hr

export const DEVICE_OPTIONS: Device.Options = {
  // logLevel: "DEBUG",
  closeProtection: true,
  tokenRefreshMs: TIME_TO_CHECK_TOKEN_WILL_EXPIRE,
  enableImprovedSignalingErrorPrecision: true,
};
