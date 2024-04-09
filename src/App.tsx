import styled from "styled-components";
import { ContactInput, Softphone, useSoftphone } from ".";
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

  const contactList: ContactInput[] = [
    {
      id: "1",
      identity: "3053303975",
      label: "+13053303975",
      status: "available",
    },
    {
      id: "2",
      identity: "305",
      label: "Jane Doe",
      status: "unavailable",
    },
    {
      id: "3",
      identity: "John Smith",
      label: "available",
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

  return (
    <Layout>
      <ControlPanel
        identity={identity}
        handleSetIdentity={handleSetIdentity}
        handleLookupContact={handleLookupContact}
      />
      <Box>
        <Softphone identity={identity} autoRegister contactList={contactList} />
      </Box>
    </Layout>
  );
};

export default App;
