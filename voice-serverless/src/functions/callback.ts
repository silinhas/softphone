import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";
import { CallStatus } from "twilio/lib/rest/api/v2010/account/call";

type MyEvent = {
  Body?: string;
  To?: string;
  CallSid?: string;
  ParentCallSid?: string;
  CallStatus?: CallStatus;
  Called?: string;
  Caller?: string;
  From?: string;
  Direction?: string;
};

type MyContext = {
  ACCOUNT_SID?: string;
  TWIML_APPLICATION_SID?: string;
  API_KEY?: string;
  API_SECRET?: string;
  CALLER_ID?: string;
};

export const handler: ServerlessFunctionSignature = (
  context: Context<MyContext>,
  event: MyEvent,
  callback: ServerlessCallback
) => {
  console.log({ event });
  const { CallSid, ParentCallSid, CallStatus } = event;
  const client = context.getTwilioClient();

  if (ParentCallSid) {
    client
      .calls(ParentCallSid)
      .userDefinedMessages.create({
        content: JSON.stringify({
          message: "Hello from the serverless function",
        }),
      })
      .then((message) => {
        console.log(`Message SID: ${message.sid}`);
      });
  }

  if (CallSid) {
    client
      .calls(CallSid)
      .userDefinedMessages.create({
        content: JSON.stringify({
          message: "Hello from the serverless function",
        }),
      })
      .then((message) => {
        console.log(`Message SID: ${message.sid}`);
      });
  }

  return callback(null, { status: "ok" });
};
