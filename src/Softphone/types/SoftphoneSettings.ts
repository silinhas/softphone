import { CallActions, Events } from "./CallActions";
import { ContactInput } from "./Contact";

export type SoftphoneSettings = {
  contact: ContactInput;
  autoRegister?: boolean;
  callActions?: CallActions;
  events: Events;
};

export const defaultSoftphoneSettings: SoftphoneSettings = {
  contact: { identity: "" },
  autoRegister: false,
  callActions: {
    hold: true,
    mute: true,
    keypad: true,
    transfer: true,
  },
  events: {
    onFetchToken: async (identity: string) => identity,
  },
};
