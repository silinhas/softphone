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
  const softphone = useSoftphone();

  const handleSetIdentity = (identity: string) => {
    if (!identity) {
      softphone.destroyDevice();
    }
    setIdentity(identity);
  };

  return (
    <Layout>
      <ControlPanel identity={identity} handleSetIdentity={handleSetIdentity} />
      <Box>
        <Softphone identity={identity} autoRegister />
      </Box>
    </Layout>
  );
};

export default App;
