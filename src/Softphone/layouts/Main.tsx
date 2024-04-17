import { Box } from "@mui/material";
import { CallStatus, SelectStatus } from "../components";
import { useSoftphone } from "../context/context";
import {
  ActiveView,
  ContactView,
  IncomingView,
  LookupView,
  OnCallView,
  RingingView,
} from "../views";
import Layout from "./Layout";
import { Actions } from "../types";

interface Props {
  actions: Actions;
}

export const Main = ({ actions }: Props) => {
  const { view, device, call } = useSoftphone();

  return (
    <>
      <Layout.Top>
        <Box height={"4em"}>
          {device?.isBusy && call ? (
            <CallStatus />
          ) : (
            <SelectStatus onChangeStatus={actions.onChangeStatus} />
          )}
        </Box>
      </Layout.Top>
      <Layout.View>
        {view === "active" && <ActiveView />}
        {view === "lookup" && (
          <LookupView onLookupContact={actions.onLookupContact} />
        )}
        {view === "contact" && (
          <ContactView onClickMakeCallButton={actions.onClickMakeCallButton} />
        )}
        {view === "ringing" && <RingingView />}
        {view === "on-call" && <OnCallView />}
        {view === "incoming" && <IncomingView />}
      </Layout.View>
    </>
  );
};
