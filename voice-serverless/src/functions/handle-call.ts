import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";

type MyEvent = {
  Body?: string;
  To?: string;
};

type MyContext = {
  ACCOUNT_SID?: string;
  TWIML_APPLICATION_SID?: string;
  API_KEY?: string;
  API_SECRET?: string;
  CALLER_ID?: string;
};

function isAValidPhoneNumber(number: string) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}

export const handler: ServerlessFunctionSignature = (
  context: Context<MyContext>,
  event: MyEvent,
  callback: ServerlessCallback
) => {
  console.log({ context });
  const twiml = new Twilio.twiml.VoiceResponse();

  if (event.To) {
    const attr = isAValidPhoneNumber(event.To) ? "number" : "client";

    const dial = twiml.dial({
      callerId: context.CALLER_ID,
    });

    console.log({ attr, eventTo: event.To });
    console.log({ callerId: context.CALLER_ID });

    dial[attr]({}, event.To);
  } else {
    twiml.say("Thanks for calling!");
  }

  callback(null, twiml);
};
