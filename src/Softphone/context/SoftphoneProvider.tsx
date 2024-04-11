import { useCallback, useReducer } from "react";
import { SoftphoneContext, SoftphoneDispatchContext } from "./context";
import {
  DEVICE_OPTIONS,
  INITIAL_STATE,
  TIME_TO_CHECK_CALL_TO_UPDATE_TOKEN,
  TOKEN_TIME_TO_LIVE,
} from "./constants";
import { InitialState, SoftphoneAction, Status, Views } from "./types";
import { getToken } from "../services/voice";
import { Call, Device, TwilioError } from "@twilio/voice-sdk";
import {
  Contact,
  ContactInput,
  SoftphoneSettings,
  TwilioServices,
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
    case "setIdentity": {
      return {
        ...state,
        identity: action.payload.identity as string,
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
    case "setContactList": {
      return {
        ...state,
        contactList: action.payload.contactList as Contact[],
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
  twilioServices,
}: {
  children: React.ReactNode;
  twilioServices: TwilioServices;
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

  const setIdentity = (identity: string) => {
    if (!Contact.validateIdentity(identity)) {
      setAlert({
        type: "error",
        message: "Invalid identity",
        context: `${identity} is not a valid identity.`,
      });
      return;
    }
    dispatch({ type: "setIdentity", payload: { identity } });
  };

  const setAlert = useCallback((alert: InitialState["alert"]) => {
    dispatch({ type: "setAlert", payload: { alert } });
  }, []);

  const clearAlert = useCallback(() => {
    dispatch({ type: "setAlert", payload: { alert: undefined } });
  }, []);

  const initializeDevice = useCallback(
    async (softphoneSettings: SoftphoneSettings = defaultSoftphoneSettings) => {
      const { identity, autoRegister, contactList, callActions } =
        softphoneSettings;

      try {
        setAlert({
          type: "info",
          message: "Initializing device...",
        });
        const token = await getToken(
          twilioServices.token,
          identity,
          TOKEN_TIME_TO_LIVE
        );
        clearAlert();
        setIdentity(identity);

        // await navigator.mediaDevices.getUserMedia({ audio: true });
        // populate dropdown with available audio devices
        const device = new Device(token, DEVICE_OPTIONS);
        addDeviceListeners(device);

        if (autoRegister) {
          registerDevice(device);
        }

        if (contactList) {
          setContactList(contactList);
        }

        if (callActions) {
          setCallActions(callActions);
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
    dispatch({ type: "setIdentity", payload: { identity: "" } });
  };

  const addDeviceListeners = (device: Device) => {
    device.on("destroyed", () => {
      resetSoftphone();
    });

    device.on("error", (twilioError: TwilioError.TwilioError /*, call */) => {
      switch (twilioError.name) {
        case "AccessTokenExpired": {
          getToken(
            twilioServices.token,
            device?.identity || "",
            TOKEN_TIME_TO_LIVE
          )
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
        default: {
          setAlert({
            type: "error",
            message: "An error occurred.",
            context: JSON.stringify(twilioError),
          });
        }
      }
    });

    device.on("incoming", (/* call */) => {
      console.log("incoming call");
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
          const newToken = await getToken(
            twilioServices.token,
            device.identity,
            TOKEN_TIME_TO_LIVE
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
      console.log("accept event", { acceptedCall });
      dispatch({ type: "setCall", payload: { call: acceptedCall } });
      setView("on-call");
    });

    call.on("cancel", () => {
      console.log("cancel event");
    });

    call.on("disconnect", (disconnectedCall: Call) => {
      console.log("disconnect event", { disconnectedCall });
      dispatch({ type: "setCall", payload: { call: undefined } });
      setView("active");
    });

    call.on("error", (twilioError: TwilioError.TwilioError) => {
      setAlert({
        type: "error",
        message: "An error occurred.",
        context: JSON.stringify(twilioError),
      });
    });

    call.on("mute", (isMute: boolean, mutedCall: Call) => {
      console.log("mute event", { isMute, mutedCall });
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
    });

    call.on("ringing", (hasEarlyMedia: boolean) => {
      console.log("ringing event", { hasEarlyMedia });
      dispatch({ type: "setCall", payload: { call } });
      setView("ringing");
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

  const setContactList = useCallback((contactList: ContactInput[]) => {
    try {
      const contactListParsed = contactList.map((contact) => {
        if (contact instanceof Contact) {
          return contact;
        } else {
          return new Contact(contact);
        }
      });

      dispatch({
        type: "setContactList",
        payload: { contactList: contactListParsed },
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to set contact list",
        context: error as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCallActions = (callActions: SoftphoneSettings["callActions"]) => {
    dispatch({
      type: "setCallActions",
      payload: { callActions },
    });
  };

  const makeCall = async (contact?: Contact) => {
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
