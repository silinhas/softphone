import {
  useSoftphoneDispatch,
  useSoftphone as useInternalSoftphone,
} from "../context/context";

export const useSoftphone = () => {
  const softphone = useInternalSoftphone();
  const { destroyDevice } = useSoftphoneDispatch();

  return {
    ...softphone,
    destroyDevice,
  };
};
