import { useReducer } from "react";
import { SoftphoneContext, SoftphoneDispatchContext } from "./context";
import { DEVICE_OPTIONS, INITIAL_STATE } from "./constants";
import { Contact, InitialState, SoftphoneAction, Status, Views } from "./types";
import { getToken } from "../services/voice";
import { Device } from "@twilio/voice-sdk";
import { isValidPhoneNumber } from "libphonenumber-js";

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
    case "selectContact": {
      return {
        ...state,
        contactSelected: action.payload.contactSelected as Contact,
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

  const setStatus = (status: Status) => {
    if (status === "available" && softphone.device) {
      registerDevice(softphone.device);
    } else if (status === "do-not-disturb" && softphone.device) {
      unregisterDevice(softphone.device);
    }
  };

  const setIdentity = (identity: string) => {
    dispatch({ type: "setIdentity", payload: { identity } });
  };

  const setAlert = (alert: InitialState["alert"]) => {
    dispatch({ type: "setAlert", payload: { alert } });
  };

  const clearAlert = () => {
    dispatch({ type: "setAlert", payload: { alert: undefined } });
  };

  const initializeDevice = async (identity: string, autoRegister = false) => {
    try {
      const token = await getToken(identity);
      setIdentity(identity);

      await navigator.mediaDevices.getUserMedia({ audio: true });
      // populate dropdown with available audio devices
      const device = new Device(token, DEVICE_OPTIONS);
      addDeviceListeners(device);

      if (autoRegister) {
        registerDevice(device);
      }

      dispatch({ type: "setView", payload: { view: "active" } });
      dispatch({ type: "setDevice", payload: { device } });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to get token",
        context: error as string,
      });
    }
  };

  const registerDevice = async (device: Device) => {
    try {
      await device.register();
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to register device",
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
      resetSoftphone();
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
    console.log("adding device listeners");

    device.on("destroyed", () => {
      console.log("device destroyed");
    });

    device.on("error", (twilioError, call) => {
      console.log("An error has occurred: ", twilioError);
      setAlert({
        type: "error",
        message: "An error has occurred",
        context: twilioError.message,
      });
    });

    device.on("incoming", (call) => {
      console.log("incoming call");
    });

    device.on("registered", () => {
      console.log("device registered");
      dispatch({ type: "setStatus", payload: { status: "available" } });
    });

    device.on("registering", () => {
      console.log("device registering");
    });

    device.on("unregistered", () => {
      console.log("device unregistered");
      dispatch({ type: "setStatus", payload: { status: "do-not-disturb" } });
    });

    device.on("tokenWillExpire", async () => {
      console.log("token will expire");
    });
  };

  const selectContact = (contactSelected: Contact) => {
    if (!contactSelected) return;

    contactSelected.type = isValidPhoneNumber(contactSelected.identity, "US")
      ? "phone"
      : "identifier";

    dispatch({ type: "selectContact", payload: { contactSelected } });
    dispatch({ type: "setView", payload: { view: "contact" } });
  };

  const clearSelectedContact = () => {
    dispatch({
      type: "selectContact",
      payload: { contactSelected: undefined },
    });
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
        }}
      >
        {children}
      </SoftphoneDispatchContext.Provider>
    </SoftphoneContext.Provider>
  );
};
