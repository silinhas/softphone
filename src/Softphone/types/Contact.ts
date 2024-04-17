import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { v4 as uuidv4 } from "uuid";

type ContactStatus = "available" | "unavailable" | "unknown";

type ContactConstructorArgs = {
  identity: string;
  id?: string;
  label?: string;
  data?: Record<string, unknown>;
  isNew?: boolean;
  status?: ContactStatus;
  avatar?: string;
  type?: "phone" | "identifier";
};

class Contact {
  identity: string;
  id: string;
  label: string;
  data?: Record<string, unknown>;
  type: "phone" | "identifier" = "identifier";
  isNew?: boolean = false;
  status: Status;
  avatar?: string;

  constructor(contactConstructorArgs: ContactConstructorArgs) {
    if (!Contact.validateIdentity(contactConstructorArgs.identity)) {
      throw new Error("Invalid identity");
    }

    this.identity = contactConstructorArgs.identity;
    this.id = contactConstructorArgs.id || uuidv4();
    this.label = this.getLabelFormatted(
      contactConstructorArgs.label || this.identity
    );

    this.data = contactConstructorArgs.data;
    this.type = isValidPhoneNumber(this.identity, "US")
      ? "phone"
      : "identifier";
    this.isNew = contactConstructorArgs.isNew;
    this.status = new Status(contactConstructorArgs.status);
    this.avatar = contactConstructorArgs.avatar;
  }

  static buildContact(contact: ContactInput): Contact {
    return contact instanceof Contact ? contact : new Contact(contact);
  }

  static validateIdentity(identity: string): boolean {
    return !/\s/.test(identity);
  }

  private getLabelFormatted(label: string): string {
    return isValidPhoneNumber(label, "US")
      ? parsePhoneNumber(label, "US").format("NATIONAL").toString()
      : label;
  }

  public toJSON(): ContactConstructorArgs {
    return {
      identity: this.identity,
      id: this.id,
      label: this.label,
      data: this.data,
      isNew: this.isNew,
      status: this.status.status,
      avatar: this.avatar,
      type: this.type,
    };
  }

  public toStringify(): string {
    return JSON.stringify(this.toJSON());
  }
}

class Status {
  constructor(public status?: ContactStatus) {
    this.status = status || "unknown";
  }

  public get color(): string {
    switch (this.status) {
      case "available":
        return "#4caf50";
      case "unavailable":
        return "#f44336";
      default:
        return "#9e9e9e";
    }
  }

  public get label(): string {
    switch (this.status) {
      case "available":
        return "Available";
      case "unavailable":
        return "Unavailable";
      default:
        return "Unknown";
    }
  }
}

export type ContactInput = ContactConstructorArgs | Contact;

export default Contact;
