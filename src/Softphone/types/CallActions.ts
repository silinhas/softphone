import { ContactInput } from "./Contact";

export type CallActions = {
  mute?: boolean;
  hold?: boolean;
  keypad?: boolean;
  transfer?: boolean;
};

export type Actions = {
  onFetchToken: (identity: string) => Promise<string>;
  onLookupContact?: (contactToLookup: string) => Promise<ContactInput[]>;
};
