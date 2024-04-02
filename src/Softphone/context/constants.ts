import { InitialState, SoftphoneDispatch, Status } from "./types";

export const STATUS: { value: Status; label: string; color: string }[] = [
  { value: "available", label: "Available", color: "#3498db" },
  { value: "do-not-disturb", label: "Do not Disturb", color: "#e74c3c" },
];

export const INITIAL_STATE: InitialState = {
  view: "inactive",
  status: "do-not-disturb",
};

export const SOFTPHONE_DISPATCH: SoftphoneDispatch = {
  setView: () => {},
  setStatus: () => {},
};
