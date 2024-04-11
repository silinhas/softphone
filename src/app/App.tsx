import { Softphone, ContactInput, useSoftphone } from "../Softphone";
import { Box, styled } from "@mui/material";
import ControlPanel from "./ControlPanel";
import { useState } from "react";

const Layout = styled("div")`
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
      identity: "9793303975",
      label: "9793303975",
      status: "available",
      avatar:
        "https://gravatar.com/avatar/3923e72894ae47c4589919409550c9bd?s=400&d=robohash&r=x",
    },
    {
      id: "2",
      identity: "+13053303976",
      label: "Jane Doe",
      status: "unavailable",
    },
    {
      id: "3",
      identity: "jhon-smith",
      label: "John Smith",
      status: "available",
    },
    {
      id: "4",
      identity: "apollo-2",
      label: "Apollo 2",
      status: "available",
      avatar:
        "https://gravatar.com/avatar/3923e72894ae47c4589919409550c8bd?s=400&d=robohash&r=x",
    },
    {
      id: "5",
      identity: "jane-doe",
      label: "Jane Doe",
      status: "unavailable",
    },
    {
      id: "6",
      identity: "john-smith",
      label: "John Smith",
      status: "available",
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
