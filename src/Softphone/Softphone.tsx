import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ContainerStyles } from "./components/Container/styles";
import { useSoftphone, useSoftphoneDispatch } from "./context/context";
import { ActiveView, InactiveView } from "./views";
import { SelectStatus } from "./components";
import { useEffect } from "react";
import Layout from "./layouts/Layout";
import ErrorBoundary from "./layouts/ErrorBoundary";

interface Props {
  identity: string;
  styles?: ContainerStyles;
}

const Softphone = ({ identity, styles }: Props) => {
  const softphone = useSoftphone();
  const { initializeDevice, setError } = useSoftphoneDispatch();

  useEffect(() => {
    if (identity) {
      setError(undefined);
      initializeDevice(identity);
    } else {
      setError({
        message: "Please enter a valid identity",
        type: "identity",
        context: `The identity is required but got ${identity} instead. When Initializing the Softphone.`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity]);

  console.log("device", softphone.device);

  return (
    <ErrorBoundary>
      <Layout styles={styles}>
        <Layout.Top>
          <SelectStatus />
        </Layout.Top>
        <Layout.View>
          {softphone.view === "inactive" && <InactiveView />}
          {softphone.view === "active" && <ActiveView />}
        </Layout.View>
        {/* <Layout.Bottom>bottom</Layout.Bottom> */}
      </Layout>
    </ErrorBoundary>
  );
};

export default Softphone;
