import "@twilio-labs/serverless-runtime-types";

import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";

type MyEvent = {
  Body?: string;
  identity?: string;
  ttl?: number;
};

type MyContext = {
  ACCOUNT_SID?: string;
  TWIML_APPLICATION_SID?: string;
  API_KEY?: string;
  API_SECRET?: string;
};

export const handler: ServerlessFunctionSignature = (
  context: Context<MyContext>,
  event: MyEvent,
  callback: ServerlessCallback
) => {
  const { identity, ttl = 86400 } = event;

  if (!identity) {
    return callback("Identity not provided");
  }

  const { ACCOUNT_SID, TWIML_APPLICATION_SID, API_KEY, API_SECRET } = context;

  if (!ACCOUNT_SID || !TWIML_APPLICATION_SID || !API_KEY || !API_SECRET) {
    return callback("Environment variables not configured correctly");
  }

  const { AccessToken } = Twilio.jwt;
  const { VoiceGrant } = AccessToken;

  const accessToken = new AccessToken(ACCOUNT_SID, API_KEY, API_SECRET, {
    ttl,
    identity,
  });

  const grant = new VoiceGrant({
    outgoingApplicationSid: TWIML_APPLICATION_SID,
    incomingAllow: true,
  });

  accessToken.addGrant(grant);

  const response = new Twilio.Response();

  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

  response.appendHeader("Content-Type", "application/json");
  response.setBody({
    identity: identity,
    token: accessToken.toJwt(),
  });
  callback(null, response);
};
