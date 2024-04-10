import { CallStatus, SelectStatus } from "../components";
import { useSoftphone } from "../context/context";
import {
  ActiveView,
  ContactView,
  LookupView,
  OnCallView,
  RingingView,
} from "../views";
import Layout from "./Layout";

export const Main = () => {
  const { view, device } = useSoftphone();

  return (
    <>
      <Layout.Top>
        {device?.isBusy ? <CallStatus /> : <SelectStatus />}
      </Layout.Top>
      <Layout.View>
        {view === "active" && <ActiveView />}
        {view === "lookup" && <LookupView />}
        {view === "contact" && <ContactView />}
        {view === "ringing" && <RingingView />}
        {view === "on-call" && <OnCallView />}
      </Layout.View>
    </>
  );
};
