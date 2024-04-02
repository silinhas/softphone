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
  view: Views;
  status: Status;
};

export type SoftphoneAction = {
  type: "setView" | "setStatus";
  payload: Partial<InitialState>;
};

export type SoftphoneDispatch = {
  setView: (view: Views) => void;
  setStatus: (status: Status) => void;
};
