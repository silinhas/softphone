import { Box } from "@mui/material";
import { CallStatus, SelectStatus } from "../components";
import { useSoftphone } from "../context/Softphone/context";
import {
  ActiveView,
  ContactView,
  IncomingView,
  LookupView,
  OnCallView,
  RingingView,
} from "../views";
import Layout from "./Layout";
import { CallAction, Handlers } from "../types";

interface Props {
  handlers?: Handlers;
  callActions?: CallAction[];
}

export const Main = ({ handlers, callActions }: Props) => {
  const { view, device, call } = useSoftphone();
  const {
    onLookupContact,
    onClickMakeCallButton,
    onRenderContact,
    onRenderIncomingView,
  } = handlers || {};

  return (
    <>
      <Layout.Top>
        <Box height={"4em"}>
          {device?.isBusy && call ? <CallStatus /> : <SelectStatus />}
        </Box>
      </Layout.Top>
      <Layout.View>
        {view === "active" && <ActiveView />}
        {view === "lookup" && <LookupView onLookupContact={onLookupContact} />}
        {view === "contact" && (
          <ContactView
            onClickMakeCallButton={onClickMakeCallButton}
            onRenderContact={onRenderContact}
          />
        )}
        {view === "ringing" && <RingingView />}
        {view === "on-call" && (
          <OnCallView
            onRenderContact={onRenderContact}
            callActions={callActions}
          />
        )}
        {view === "incoming" && (
          <IncomingView onRenderIncomingView={onRenderIncomingView} />
        )}
      </Layout.View>
    </>
  );
};
