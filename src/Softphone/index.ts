export { type ContactInput } from "./types";
export * from "./types";

export { default as SoftphoneProvider } from "./context/SoftphoneProvider";
export * from "./context/types";
export * from "./context/SoftphoneProvider";

export { useSoftphone } from "./hooks/useSoftphone";
export * from "./hooks/useSoftphone";

import Softphone from "./Softphone";
export default Softphone;
