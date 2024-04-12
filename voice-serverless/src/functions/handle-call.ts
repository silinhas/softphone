import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";

type MyEvent = {
  to?: string;
  contact?: string;
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
  const twiml = new Twilio.twiml.VoiceResponse();
  const { to, contact } = event;

  if (to) {
    const attr = isAValidPhoneNumber(to) ? "number" : "client";

    const dial = twiml.dial({
      callerId: context.CALLER_ID,
      timeout: 15,
      // answerOnBridge: true, //!!! check this issue (https://github.com/twilio/twilio-voice.js/issues/140)
    });

    if (attr === "client") {
      dial
        .client(
          {
            statusCallback: "/callback",
            statusCallbackMethod: "POST",
            statusCallbackEvent: [
              "initiated",
              "ringing",
              "answered",
              "completed",
            ],
          },
          to
        )
        .parameter({ name: "contact", value: contact });
    } else {
      dial.number(
        {
          statusCallback: "/callback",
          statusCallbackMethod: "POST",
          statusCallbackEvent: [
            "initiated",
            "ringing",
            "answered",
            "completed",
          ],
        },
        to
      );
    }
  } else {
    twiml.say("Thanks for calling!");
  }

  callback(null, twiml);
};
