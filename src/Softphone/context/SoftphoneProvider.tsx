import { useCallback, useReducer } from "react";
import { SoftphoneContext, SoftphoneDispatchContext } from "./context";
import {
  DEVICE_OPTIONS,
  INITIAL_STATE,
  TIME_TO_CHECK_CALL_TO_UPDATE_TOKEN,
} from "./constants";
import { InitialState, SoftphoneAction, Status, Views } from "./types";
import { Call, Device, TwilioError } from "@twilio/voice-sdk";
import {
  Actions,
  Contact,
  ContactInput,
  SoftphoneSettings,
  defaultSoftphoneSettings,
} from "../types";

function softphoneReducer(state: InitialState, action: SoftphoneAction) {
  switch (action.type) {
    case "setView": {
      return {
        ...state,
        view: action.payload.view as Views,
      };
    }
    case "setStatus": {
      return {
        ...state,
        status: action.payload.status as Status,
      };
    }
    case "setContact": {
      return {
        ...state,
        contact: action.payload.contact as Contact,
      };
    }
    case "setAlert": {
      return {
        ...state,
        alert: action.payload.alert,
      };
    }
    case "setDevice": {
      return {
        ...state,
        device: action.payload.device as Device,
      };
    }
    case "setCall": {
      return {
        ...state,
        call: action.payload.call as Call,
      };
    }
    case "selectContact": {
      return {
        ...state,
        contactSelected: action.payload.contactSelected as Contact,
      };
    }
    case "setCallActions": {
      return {
        ...state,
        callActions: {
          ...state.callActions,
          ...(action.payload.callActions as SoftphoneSettings["callActions"]),
        },
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export const SoftphoneProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [softphone, dispatch] = useReducer(softphoneReducer, INITIAL_STATE);

  const setView = (view: Views) => {
    dispatch({ type: "setView", payload: { view } });
  };

  const setStatus = async (status: Status) => {
    console.log(status, softphone.device);
    if (status === "available" && softphone.device) {
      await registerDevice(softphone.device);
    } else if (status === "do-not-disturb" && softphone.device) {
      await unregisterDevice(softphone.device);
    }
  };

  const setContact = (contact: ContactInput) => {
    dispatch({
      type: "setContact",
      payload: { contact: Contact.buildContact(contact) },
    });
  };

  const setAlert = useCallback((alert: InitialState["alert"]) => {
    dispatch({ type: "setAlert", payload: { alert } });
  }, []);

  const clearAlert = useCallback(() => {
    dispatch({ type: "setAlert", payload: { alert: undefined } });
  }, []);

  const initializeDevice = async (
    softphoneSettings: SoftphoneSettings = defaultSoftphoneSettings
  ) => {
    const { contact, autoRegister, callActions, onFetchToken } =
      softphoneSettings;

    try {
      setAlert({
        type: "info",
        message: "Initializing device...",
      });

      const token = await onFetchToken(contact.identity);

      clearAlert();
      setContact(contact);

      // await navigator.mediaDevices.getUserMedia({ audio: true });
      // populate dropdown with available audio devices
      const device = new Device(token, DEVICE_OPTIONS);
      addDeviceListeners(device, { onFetchToken });

      if (autoRegister) {
        registerDevice(device);
      }

      if (callActions) {
        dispatch({ type: "setCallActions", payload: { callActions } });
      }

      dispatch({ type: "setView", payload: { view: "active" } });
      dispatch({ type: "setDevice", payload: { device } });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to initialize device.",
        context: error as string,
        severity: "critical",
      });
    }
  };

  const registerDevice = async (device: Device) => {
    try {
      await device.register();
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to register device. Try again.",
        context: error as string,
      });
    }
  };

  const unregisterDevice = async (device: Device) => {
    try {
      await device.unregister();
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to unregister device",
        context: error as string,
      });
    }
  };

  const destroyDevice = () => {
    try {
      if (!softphone.device) {
        setAlert({
          type: "warning",
          message: "Device does not exist",
        });
        return;
      }
      softphone.device.destroy();
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to destroy device",
        context: error as string,
      });
    }
  };

  const resetSoftphone = () => {
    dispatch({ type: "setDevice", payload: { device: undefined } });
    dispatch({ type: "setView", payload: { view: "inactive" } });
    dispatch({ type: "setStatus", payload: { status: "do-not-disturb" } });
    dispatch({
      type: "setContact",
      payload: { contact: new Contact({ identity: "" }) },
    });
  };

  const addDeviceListeners = (device: Device, actions: Actions) => {
    device.on("destroyed", () => {
      resetSoftphone();
    });

    device.on("error", (twilioError: TwilioError.TwilioError /*, call */) => {
      switch (twilioError.name) {
        case "AccessTokenExpired": {
          actions
            .onFetchToken(softphone.contact.identity)
            .then((newToken) => {
              device.updateToken(newToken);
            })
            .catch((error) => {
              setAlert({
                type: "error",
                message: "An error occurred.",
                context: JSON.stringify(error),
              });
            });
          break;
        }
        case "AuthorizationTokenMissingError": {
          setAlert({
            type: "error",
            message: "An error occurred.",
            context: JSON.stringify(twilioError),
          });
          break;
        }
        default: {
          setAlert({
            type: "error",
            message: "An error occurred.",
            context: JSON.stringify(twilioError),
          });
        }
      }
    });

    device.on("incoming", (call: Call) => {
      console.log("incoming call", { call });
      addCallListeners(call);

      let contact: Contact;
      const contactFromCustomParams = call?.customParameters?.get("contact");
      const contactFromParams = { identity: call.parameters.From };

      console.log({ contactFromCustomParams, contactFromParams });

      if (contactFromCustomParams) {
        contact = new Contact(JSON.parse(contactFromCustomParams));
      } else {
        contact = new Contact(contactFromParams);
      }

      selectContact(contact);
      dispatch({ type: "setCall", payload: { call } });
      setView("incoming");
    });

    device.on("registered", () => {
      dispatch({ type: "setStatus", payload: { status: "available" } });
    });

    device.on("registering", () => {});

    device.on("unregistered", () => {
      dispatch({ type: "setStatus", payload: { status: "do-not-disturb" } });
    });

    device.on("tokenWillExpire", () => {
      const timer = setInterval(async () => {
        if (device?.identity) {
          const newToken = await actions.onFetchToken(device.identity);
          if (device.state === "registered") {
            device.updateToken(newToken);
          }
          clearInterval(timer);
        }
      }, TIME_TO_CHECK_CALL_TO_UPDATE_TOKEN);
    });
  };

  const addCallListeners = (call: Call) => {
    call.on("accept", (acceptedCall: Call) => {
      console.log("accept event", { acceptedCall });
      dispatch({ type: "setCall", payload: { call: acceptedCall } });
      setView("on-call");
      // !!! check this issue (https://github.com/twilio/twilio-voice.js/issues/140) and uncomment this line after fixing it and remove messageReceived for call
    });

    call.on("cancel", () => {
      console.log("cancel event");
      setView("active");
      clearSelectedContact();
      dispatch({ type: "setCall", payload: { call: undefined } });
    });

    call.on("disconnect", (disconnectedCall: Call) => {
      console.log("disconnect event", { disconnectedCall });
      setView("active");
      clearSelectedContact();
      dispatch({ type: "setCall", payload: { call: undefined } });
    });

    call.on("error", (twilioError: TwilioError.TwilioError) => {
      console.log("error event", { twilioError });
      setAlert({
        type: "error",
        message: "An error occurred.",
        context: JSON.stringify(twilioError),
      });
    });

    call.on("mute", (_isMute: boolean, mutedCall: Call) => {
      dispatch({ type: "setCall", payload: { call: mutedCall } });
    });

    call.on("reconnected", () => {
      console.log("reconnected event");
    });

    call.on("reconnecting", (twilioError: TwilioError.TwilioError) => {
      console.log("reconnecting event", { twilioError });
      setAlert({
        type: "error",
        message: "An error occurred. Reconnecting..",
        context: JSON.stringify(twilioError),
      });
    });

    call.on("reject", () => {
      console.log("reject event");
      setView("active");
      clearSelectedContact();
      dispatch({ type: "setCall", payload: { call: undefined } });
    });

    call.on("ringing", (hasEarlyMedia: boolean) => {
      console.log("ringing event", { hasEarlyMedia });
      dispatch({ type: "setCall", payload: { call } });
      setView("ringing");
    });

    call.on("messageReceived", (message) => {
      console.log("messageReceived event", { message });
      //the voiceEventSid can be used for tracking the message
      console.log("voiceEventSid: ", message.voiceEventSid);
    });
  };

  const selectContact = (contactSelected: Contact) => {
    dispatch({ type: "selectContact", payload: { contactSelected } });
    dispatch({ type: "setView", payload: { view: "contact" } });
  };

  const clearSelectedContact = () => {
    dispatch({
      type: "selectContact",
      payload: { contactSelected: undefined },
    });
  };

  const makeCall = async (
    contact?: Contact,
    params?: Record<string, unknown>
  ) => {
    const contactToCall = contact || softphone.contactSelected;

    if (!contactToCall) {
      setAlert({
        type: "error",
        message: "No contact selected",
      });
      return;
    }

    try {
      const call = await softphone.device?.connect({
        params: {
          To: contactToCall.identity,
          From: softphone.contact.toStringify(),
          ...params,
        },
      });

      if (call) {
        dispatch({ type: "setCall", payload: { call } });
        addCallListeners(call);
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to make call",
        context: error as string,
      });
    }
  };

  const hangUp = () => {
    try {
      softphone.device?.disconnectAll();
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to hang up",
        context: error as string,
      });
    }
  };

  return (
    <SoftphoneContext.Provider value={softphone}>
      <SoftphoneDispatchContext.Provider
        value={{
          setView,
          setStatus,
          setAlert,
          clearAlert,
          initializeDevice,
          destroyDevice,
          selectContact,
          clearSelectedContact,
          makeCall,
          hangUp,
        }}
      >
        {children}
      </SoftphoneDispatchContext.Provider>
    </SoftphoneContext.Provider>
  );
};

export default SoftphoneProvider;
