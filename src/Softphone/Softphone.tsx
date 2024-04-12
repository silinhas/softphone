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
import { ThemeProvider, createTheme } from "@mui/material";
import { CallActions, ContactInput } from "./types";
interface Props {
  contact?: ContactInput;
  autoRegister?: boolean;
  showStatus?: boolean;
  contactList: ContactInput[];
  callActions?: CallActions;
  styles?: ContainerStyles;
}
const theme = createTheme();

const Softphone = ({
  contact,
  autoRegister,
  showStatus = true,
  contactList,
  callActions,
  styles,
}: Props) => {
  const { initializeDevice, setAlert } = useSoftphoneDispatch();

  useEffect(() => {
    if (!contact?.identity) {
      setAlert({
        type: "error",
        severity: "critical",
        message: "Identity is required to initialize the Softphone.",
        context: `The identity is required. When Initializing the Softphone.`,
      });
    } else {
      initializeDevice({ contact, autoRegister, contactList, callActions });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact?.identity]);

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
