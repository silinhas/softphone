import { SelectStatus } from "../components";
import { useSoftphone } from "../context/context";
import { ActiveView, InactiveView } from "../views";
import Layout from "./Layout";

export const Main = () => {
  const softphone = useSoftphone();

  return (
    <>
      <Layout.Top>
        <SelectStatus />
      </Layout.Top>
      <Layout.View>
        {softphone.view === "inactive" && <InactiveView />}
        {softphone.view === "active" && <ActiveView />}
      </Layout.View>
    </>
  );
};
