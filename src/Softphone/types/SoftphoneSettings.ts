import { Actions, CallActions } from "./CallActions";
import { ContactInput } from "./Contact";

export type SoftphoneSettings = {
  contact: ContactInput;
  autoRegister?: boolean;
  callActions?: CallActions;
  actions: Actions;
};

export const defaultSoftphoneSettings: SoftphoneSettings = {
  contact: { identity: "" },
  actions: { onFetchToken: async () => "" },
  autoRegister: false,
  callActions: {
    hold: true,
    mute: true,
    keypad: true,
    transfer: true,
  },
};
