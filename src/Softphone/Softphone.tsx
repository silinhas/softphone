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
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";
import { Contact, ContactConstructorArgs } from "./types";

interface Props {
  identity: string;
  autoRegister?: boolean;
  showStatus?: boolean;
  contactList: ContactConstructorArgs[] | Contact[];
  styles?: ContainerStyles;
}
const theme = createTheme();

const Softphone = ({
  identity,
  autoRegister,
  showStatus = true,
  contactList,
  styles,
}: Props) => {
  const { initializeDevice, setAlert, clearAlert, setContactList } =
    useSoftphoneDispatch();

  useEffect(() => {
    if (!identity) {
      setAlert({
        type: "error",
        severity: "critical",
        message: "Identity is required to initialize the Softphone.",
        context: `The identity is required. When Initializing the Softphone.`,
      });
    } else {
      clearAlert();
      initializeDevice(identity, autoRegister);
      if (contactList) {
        setContactList(contactList);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity, contactList]);

  return (
    <ThemeProvider theme={theme}>
      <Layout styles={styles}>
        <ErrorBoundary>
          <Main />
        </ErrorBoundary>
        {showStatus && <Status />}
        <AlertSnackBar />
      </Layout>
    </ThemeProvider>
  );
};

export default Softphone;
