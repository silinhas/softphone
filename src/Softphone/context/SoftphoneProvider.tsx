import { useReducer } from "react";
import { SoftphoneContext, SoftphoneDispatchContext } from "./context";
import { DEVICE_OPTIONS, INITIAL_STATE } from "./constants";
import { InitialState, SoftphoneAction, Status, Views } from "./types";
import { getToken } from "../services/voice";
import { Device } from "@twilio/voice-sdk";

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
    case "setError": {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case "setDevice": {
      return {
        ...state,
        device: action.payload.device as Device,
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
    dispatch({ type: "setStatus", payload: { status } });
  };

  const setIdentity = (identity: string) => {
    dispatch({ type: "setIdentity", payload: { identity } });
  };

  const setError = (error: InitialState["error"]) => {
    dispatch({ type: "setError", payload: { error } });
  };

  const initializeDevice = async (identity: string) => {
    try {
      const token = await getToken(identity);
      setIdentity(identity);

      const device = new Device(token, DEVICE_OPTIONS);
      addDeviceListeners(device);

      // TODO: check if token is valid
      // device.register();

      dispatch({ type: "setDevice", payload: { device } });
    } catch (error) {
      setError({
        type: "token",
        message: "Failed to get token",
        context: error as string,
      });
    }
  };

  const addDeviceListeners = (device: Device) => {
    console.log("adding device listeners");

    device.on("destroyed", () => {
      console.log("device destroyed");
    });

    device.on("error", (twilioError, call) => {
      console.log("An error has occurred: ", twilioError);
    });

    device.on("incoming", (call) => {
      console.log("incoming call");
    });

    device.on("registered", () => {
      console.log("device registered");
    });

    device.on("registering", () => {
      console.log("device registering");
    });

    device.on("unregistered", () => {
      console.log("device unregistered");
    });

    device.on("tokenWillExpire", async () => {
      console.log("token will expire");
      // const token = await getToken(softphone.identity);
      // device.updateToken(token);
    });

    device.on("unregistered", () => {
      console.log("unregistered");
    });
  };

  // const registerDevice = async (device: Device) => {
  //   try {
  //     await device.register();
  //   } catch (error) {
  //     setError({
  //       type: "device",
  //       message: "Failed to register device",
  //       context: error as string,
  //     });
  //   }
  // };

  // const unregisterDevice = async (device: Device) => {
  //   try {
  //     await device.unregister();
  //   } catch (error) {
  //     setError({
  //       type: "device",
  //       message: "Failed to unregister device",
  //       context: error as string,
  //     });
  //   }
  // };

  return (
    <SoftphoneContext.Provider value={softphone}>
      <SoftphoneDispatchContext.Provider
        value={{
          setView,
          setStatus,
          setError,
          initializeDevice,
        }}
      >
        {children}
      </SoftphoneDispatchContext.Provider>
    </SoftphoneContext.Provider>
  );
};
