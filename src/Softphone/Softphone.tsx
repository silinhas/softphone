import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ContainerStyles } from "./components/Container/styles";
import { AlertSnackBar, SideBarPanel, Status } from "./components";
import { useEffect } from "react";
import Layout from "./layouts/Layout";
import ErrorBoundary from "./layouts/ErrorBoundary";
import { Main } from "./layouts/Main";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  ContactInput,
  Handlers,
  Events,
  SideBarProps,
  CallAction,
} from "./types";
import { useSoftphoneDispatch } from "./context/Softphone/context";
interface Props {
  contact: ContactInput;
  autoRegister?: boolean;
  showStatus?: boolean;
  events: Events;
  handlers?: Handlers;
  styles?: ContainerStyles;
  sidebar?: SideBarProps;
  callActions?: CallAction[];
}
const theme = createTheme();

const Softphone = ({
  contact,
  autoRegister,
  showStatus = true,
  handlers,
  events,
  styles,
  sidebar,
  callActions,
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
      initializeDevice({
        contact,
        autoRegister,
        events,
        callActions,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact?.identity]);

  return (
    <ThemeProvider theme={theme}>
      <Layout styles={styles}>
        <ErrorBoundary>
          <Main handlers={handlers} callActions={callActions} />
        </ErrorBoundary>
        {sidebar && <SideBarPanel {...sidebar} />}
        {showStatus && <Status />}
        <AlertSnackBar />
      </Layout>
    </ThemeProvider>
  );
};

export default Softphone;
