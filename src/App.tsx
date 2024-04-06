import styled from "styled-components";
import { Softphone, useSoftphone } from ".";
import { Box } from "@mui/material";
import ControlPanel from "./ControlPanel";
import { useState } from "react";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  justify-content: space-evenly;
`;

const App = () => {
  const [identity, setIdentity] = useState("");
  const { destroyDevice, lookupContact } = useSoftphone();

  const handleSetIdentity = (identity: string) => {
    if (!identity) {
      destroyDevice();
    }
    setIdentity(identity);
  };

  const handleLookupContact = (contactToLookup: string) => {
    lookupContact({
      identity: contactToLookup,
      label: contactToLookup,
      id: contactToLookup,
    });
  };

  return (
    <Layout>
      <ControlPanel
        identity={identity}
        handleSetIdentity={handleSetIdentity}
        handleLookupContact={handleLookupContact}
      />
      <Box>
        <Softphone identity={"Apollo"} autoRegister />
      </Box>
    </Layout>
  );
};

export default App;
