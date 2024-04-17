import { Actions, CallActions } from "./CallActions";
import { ContactInput } from "./Contact";

export type SoftphoneSettings = {
  contact: ContactInput;
  autoRegister?: boolean;
  callActions?: CallActions;
  onFetchToken: Actions["onFetchToken"];
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
  onFetchToken: async (identity: string) => identity,
};
