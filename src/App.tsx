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

const mockData = [
  {
    id: "1",
    identity: "John Doe",
    label: "John Doe",
  },
  {
    id: "2",
    identity: "Jane Doe",
    label: "Jane Doe",
  },
  {
    id: "3",
    identity: "John Smith",
    label: "John Smith",
  },
  {
    id: "4",
    identity: "Jane Smith",
    label: "Jane Smith",
  },
  {
    id: "5",
    identity: "John Doe",
    label: "John Doe",
  },
  {
    id: "6",
    identity: "Jane Doe",
    label: "Jane Doe",
  },
  {
    id: "7",
    identity: "John Smith",
    label: "John Smith",
  },
  {
    id: "8",
    identity: "Jane Smith",
    label: "Jane Smith",
  },
  {
    id: "9",
    identity: "John Doe",
    label: "John Doe",
  },
  {
    id: "10",
    identity: "Jane Doe",
    label: "Jane Doe",
  },
];

const App = () => {
  const [identity, setIdentity] = useState("Apollo");
  const { destroyDevice, lookupContact } = useSoftphone();

  const handleSetIdentity = (identity: string) => {
    if (!identity) {
      destroyDevice();
    }
    setIdentity(identity);
  };

  const handleLookupContact = (contactToLookup: string) => {
    lookupContact(contactToLookup);
  };

  return (
    <Layout>
      <ControlPanel
        identity={identity}
        handleSetIdentity={handleSetIdentity}
        handleLookupContact={handleLookupContact}
      />
      <Box>
        <Softphone identity={identity} autoRegister contactList={mockData} />
      </Box>
    </Layout>
  );
};

export default App;
