import { CallActions } from "./CallActions";
import { ContactInput } from "./Contact";

export type SoftphoneSettings = {
  identity: string;
  autoRegister?: boolean;
  contactList?: ContactInput[];
  callActions?: CallActions;
};

export const defaultSoftphoneSettings: SoftphoneSettings = {
  identity: "",
  autoRegister: false,
  contactList: [],
  callActions: {
    hold: true,
    mute: true,
    keypad: true,
    transfer: true,
  },
};
