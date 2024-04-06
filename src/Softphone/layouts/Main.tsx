import { SelectStatus } from "../components";
import { useSoftphone } from "../context/context";
import { ActiveView, ContactView, LookupView } from "../views";
import Layout from "./Layout";

export const Main = () => {
  const { view } = useSoftphone();

  return (
    <>
      <Layout.Top>
        <SelectStatus />
      </Layout.Top>
      <Layout.View>
        {view === "active" && <ActiveView />}
        {view === "lookup" && <LookupView />}
        {view === "contact" && <ContactView />}
      </Layout.View>
    </>
  );
};
