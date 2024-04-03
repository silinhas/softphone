import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ContainerStyles } from "./components/Container/styles";
import { useSoftphoneDispatch } from "./context/context";
import { AlertSnackBar, Status } from "./components";
import { useEffect } from "react";
import Layout from "./layouts/Layout";
import ErrorBoundary from "./layouts/ErrorBoundary";
import { Main } from "./layouts/Main";

interface Props {
  identity: string;
  autoRegister?: boolean;
  styles?: ContainerStyles;
  destroySoftphone?: () => void;
}

const Softphone = ({ identity, autoRegister, styles }: Props) => {
  const { initializeDevice, setAlert, clearAlert } = useSoftphoneDispatch();

  useEffect(() => {
    if (!identity) {
      setAlert({
        type: "error",
        severity: "critical",
        message: "Identity is required to initialize the Softphone.",
        context: `The identity is required but got ${identity} instead. When Initializing the Softphone.`,
      });
    } else {
      clearAlert();
      initializeDevice(identity, autoRegister);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity]);

  return (
    <Layout styles={styles}>
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
      <Status />
      <AlertSnackBar />
    </Layout>
  );
};

export default Softphone;
