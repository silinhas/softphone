import { CallActions } from "./CallActions";
import { ContactInput } from "./Contact";

export type SoftphoneSettings = {
  contact: ContactInput;
  autoRegister?: boolean;
  contactList?: ContactInput[];
  callActions?: CallActions;
};

export const defaultSoftphoneSettings: SoftphoneSettings = {
  contact: { identity: "" },
  autoRegister: false,
  contactList: [],
  callActions: {
    hold: true,
    mute: true,
    keypad: true,
    transfer: true,
  },
};
