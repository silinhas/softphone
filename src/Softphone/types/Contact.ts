import { isValidPhoneNumber } from "libphonenumber-js";
import { v4 as uuidv4 } from "uuid";

export type ContactConstructorArgs = {
  identity: string;
  id?: string;
  label?: string;
  data?: unknown;
  isNew?: boolean;
};

class Contact {
  identity: string;
  id?: string;
  label?: string;
  data?: unknown;
  type: "phone" | "identifier" = "identifier";
  isNew?: boolean = false;

  constructor(contactConstructorArgs: ContactConstructorArgs) {
    this.identity = contactConstructorArgs.identity;
    this.id = contactConstructorArgs.id || uuidv4();
    this.label = contactConstructorArgs.label || this.identity;
    this.data = contactConstructorArgs.data;
    this.type = isValidPhoneNumber(this.identity, "US")
      ? "phone"
      : "identifier";
    this.isNew = contactConstructorArgs.isNew;
  }
}

export default Contact;
