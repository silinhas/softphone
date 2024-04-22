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
import { Handlers } from "../types";

interface Props {
  handlers?: Handlers;
}

export const Main = ({ handlers }: Props) => {
  const { view, device, call } = useSoftphone();
  const {
    onLookupContact,
    onClickMakeCallButton,
    onClickTransferCallButton,
    onClickHoldCallButton,
    onRenderContact,
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
            onClickTransferCallButton={onClickTransferCallButton}
            onClickHoldCallButton={onClickHoldCallButton}
            onRenderContact={onRenderContact}
          />
        )}
        {view === "incoming" && <IncomingView />}
      </Layout.View>
    </>
  );
};
