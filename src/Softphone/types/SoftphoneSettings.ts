import { CallAction, Events } from "./CallActions";
import { ContactInput } from "./Contact";

export type SoftphoneSettings = {
  contact: ContactInput;
  autoRegister?: boolean;
  events: Events;
  callActions?: CallAction[];
};

export const defaultSoftphoneSettings: SoftphoneSettings = {
  contact: { identity: "" },
  autoRegister: false,
  events: {
    onFetchToken: async (identity: string) => {
      return identity;
    },
  },
};
