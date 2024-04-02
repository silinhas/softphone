import styled from "styled-components";
import { Softphone, SoftphoneProvider } from ".";
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

  const handleSetIdentity = (identity: string) => {
    setIdentity(identity);
  };

  return (
    <Layout>
      <ControlPanel identity={identity} handleSetIdentity={handleSetIdentity} />
      <Box>
        <SoftphoneProvider>
          <Softphone identity={identity} />
        </SoftphoneProvider>
      </Box>
    </Layout>
  );
};

export default App;
