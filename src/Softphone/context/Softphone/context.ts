import { createContext, useContext } from "react";
import { InitialState, SoftphoneDispatch } from "./types";
import { INITIAL_STATE, SOFTPHONE_DISPATCH } from "./constants";

export const SoftphoneContext = createContext<InitialState>(INITIAL_STATE);
export const SoftphoneDispatchContext =
  createContext<SoftphoneDispatch>(SOFTPHONE_DISPATCH);

export function useSoftphone() {
  return useContext(SoftphoneContext);
}

export function useSoftphoneDispatch() {
  return useContext(SoftphoneDispatchContext);
}
