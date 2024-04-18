import { useCallback, useReducer, useRef } from "react";
import { SoftphoneContext, SoftphoneDispatchContext } from "./context";
import {
  DEVICE_OPTIONS,
  INITIAL_STATE,
  TIME_TO_CHECK_CALL_TO_UPDATE_TOKEN,
} from "./constants";
import { InitialState, SoftphoneAction, Status, Views } from "./types";
import { Call, Device, TwilioError } from "@twilio/voice-sdk";
import {
  Contact,
  ContactInput,
  Events,
  SoftphoneSettings,
  defaultSoftphoneSettings,
} from "../types";
import { log } from "../utils";

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

  // To keep the state ref updated inside the callbacks of the device and call events
  const softphoneRef = useRef<InitialState>(softphone);
  softphoneRef.current = softphone;

  const getEventContext = () => {
    return {
      device: softphoneRef.current.device,
      call: softphoneRef.current.call,
      contact: softphoneRef.current.contact,
      contactSelected: softphoneRef.current.contactSelected,
      status: softphoneRef.current.status,
      view: softphoneRef.current.view,
    };
  };

  const setView = (view: Views) => {
    dispatch({ type: "setView", payload: { view } });
  };

  const setStatus = async (status: Status) => {
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
    const { contact, autoRegister, callActions, events } = softphoneSettings;

    try {
      setAlert({
        type: "info",
        message: "Initializing device...",
      });

      const token = await events.onFetchToken(
        contact.identity,
        getEventContext()
      );

      clearAlert();
      setContact(contact);

      // await navigator.mediaDevices.getUserMedia({ audio: true });
      // populate dropdown with available audio devices
      const device = new Device(token, DEVICE_OPTIONS);
      addDeviceListeners(device, events);

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

  const addDeviceListeners = (device: Device, events: Events) => {
    device.on("destroyed", () => {
      resetSoftphone();
    });

    device.on("error", (twilioError: TwilioError.TwilioError /*, call */) => {
      switch (twilioError.name) {
        case "AccessTokenExpired": {
          events
            .onFetchToken(softphone.contact.identity, getEventContext())
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
      addCallListeners(call);

      let contact = new Contact({ identity: call.parameters.From });

      if (events.onIncomingCall) {
        const contactInput = events.onIncomingCall(call, getEventContext());

        if (contactInput) {
          contact = Contact.buildContact(contactInput);
        }
      }

      selectContact(contact);
      dispatch({ type: "setCall", payload: { call } });
      setView("incoming");
    });

    device.on("registered", () => {
      events?.onChangeStatus?.("available", getEventContext());
      dispatch({ type: "setStatus", payload: { status: "available" } });
    });

    device.on("registering", () => {});

    device.on("unregistered", () => {
      events?.onChangeStatus?.("do-not-disturb", getEventContext());
      dispatch({ type: "setStatus", payload: { status: "do-not-disturb" } });
    });

    device.on("tokenWillExpire", () => {
      const timer = setInterval(async () => {
        if (device?.identity) {
          const newToken = await events.onFetchToken(
            device.identity,
            getEventContext()
          );
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
      log("log", "accept event", { acceptedCall });
      dispatch({ type: "setCall", payload: { call: acceptedCall } });
      // setView("on-call");
      // !!! check this issue (https://github.com/twilio/twilio-voice.js/issues/140) and uncomment this line after fixing it and remove messageReceived for call
    });

    call.on("cancel", () => {
      log("log", "cancel event");
      setView("active");
      clearSelectedContact();
      dispatch({ type: "setCall", payload: { call: undefined } });
    });

    call.on("disconnect", (disconnectedCall: Call) => {
      log("log", "disconnect event", { disconnectedCall });
      setView("active");
      clearSelectedContact();
      dispatch({ type: "setCall", payload: { call: undefined } });
    });

    call.on("error", (twilioError: TwilioError.TwilioError) => {
      log("error", "error event", { twilioError });
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
      log("log", "reconnected event");
    });

    call.on("reconnecting", (twilioError: TwilioError.TwilioError) => {
      log("log", "reconnecting event", { twilioError });
      setAlert({
        type: "error",
        message: "An error occurred. Reconnecting..",
        context: JSON.stringify(twilioError),
      });
    });

    call.on("reject", () => {
      log("log", "reject event");
      setView("active");
      clearSelectedContact();
      dispatch({ type: "setCall", payload: { call: undefined } });
    });

    call.on("ringing", (hasEarlyMedia: boolean) => {
      log("log", "ringing event", { hasEarlyMedia });
      dispatch({ type: "setCall", payload: { call } });
      setView("ringing");
    });

    call.on("messageReceived", (message) => {
      log("log", "messageReceived event", { message });
      const { type } = message.content;
      if (type === "CALL_CONNECTED") {
        setView("on-call");
      }
    });
  };

  const selectContact = (contactSelected: ContactInput) => {
    const { contact, device } = softphoneRef.current;

    if (!contact?.identity || device?.state === "destroyed") {
      setAlert({
        message: "The softphone is not ready to make calls.",
        severity: "critical",
        type: "error",
        context:
          "lookupContact failed. Identity is missing or device.state is destroyed.",
      });
      return;
    }

    if (contactSelected.identity === contact.identity) {
      setAlert({
        message: "You are registered as this contact.",
        type: "error",
        context: "selectContact failed. Cannot select yourself.",
      });
      return;
    }

    dispatch({
      type: "selectContact",
      payload: { contactSelected: Contact.buildContact(contactSelected) },
    });
    dispatch({ type: "setView", payload: { view: "contact" } });
  };

  const clearSelectedContact = () => {
    dispatch({
      type: "selectContact",
      payload: { contactSelected: undefined },
    });
  };

  const makeCall = async (
    contact?: ContactInput,
    params?: Record<string, unknown>
  ) => {
    let contactToCall = softphone.contactSelected;

    if (contact) {
      contactToCall = Contact.buildContact(contact);
    }

    if (!contactToCall) {
      setAlert({
        type: "error",
        message: "No contact selected",
      });
      return;
    }

    if (
      !softphone.contact?.identity ||
      softphone.device?.state === "destroyed"
    ) {
      setAlert({
        message: "The softphone is not ready to make calls.",
        severity: "critical",
        type: "error",
        context:
          "makeCall failed. Identity is missing or device.state is destroyed.",
      });
      return;
    }

    if (contactToCall.identity === softphone.contact.identity) {
      setAlert({
        message: "You are registered as this contact.",
        type: "error",
        context: "makeCall failed. Cannot call yourself.",
      });
      return;
    }

    if (softphone.device?.isBusy) {
      setAlert({
        message: "The device is busy.",
        type: "error",
        context: "makeCall failed. The device is busy.",
      });
      return;
    }

    try {
      if (!softphone.contactSelected) {
        selectContact(contactToCall);
      }

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
