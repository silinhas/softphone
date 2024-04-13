import { Softphone, ContactInput, useSoftphone } from "../Softphone";
import { Box, styled } from "@mui/material";
import ControlPanel from "./ControlPanel";
import React from "react";
import { isValidPhoneNumber } from "libphonenumber-js/min";

const Layout = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  justify-content: space-evenly;
`;

const App = () => {
  const [contact, setContact] = React.useState<ContactInput>();
  const { destroyDevice, lookupContact } = useSoftphone();

  const handleSetContact = (contact: ContactInput | undefined) => {
    if (!contact) {
      destroyDevice();
    }
    setContact(contact);
  };

  const handleDirectLookupContact = (contactToLookup: string) => {
    lookupContact(contactToLookup);
  };

  const contactList: ContactInput[] = [
    {
      id: "1",
      identity: "apollo1",
      label: "Apollo 1",
      status: "available",
      avatar:
        "https://gravatar.com/avatar/3923e72894ae47c4589919409550c9bd?s=400&d=robohash&r=x",
    },
    {
      id: "2",
      identity: "apollo2",
      label: "Apollo 2",
      status: "available",
      avatar:
        "https://gravatar.com/avatar/3923e72894ae47c4589919409550r2cd?s=400&d=robohash&r=x",
    },
    {
      id: "3",
      identity: "jane-doe",
      label: "Jane Doe",
      status: "unavailable",
    },
    {
      id: "4",
      identity: "john-smith",
      label: "John Smith",
      status: "available",
    },
    {
      id: "5",
      identity: "sarah-jones",
      label: "Sarah Jones",
      status: "unknown",
    },
  ];

  const handleFetchToken = async (identity: string) => {
    const response = await fetch(
      `${
        import.meta.env.SOFTPHONE_TWILIO_FUNCTIONS_DOMAIN
      }/token?identity=${identity}`
    );
    const { data } = await response.json();

    return data.token;
  };

  const handleLookupContact = async (contactToLookup: string) => {
    const results = contactList.filter((contact) =>
      contact.identity.includes(contactToLookup)
    );

    if (!results.length && isValidPhoneNumber(contactToLookup, "US")) {
      return [
        {
          identity: contactToLookup,
          isNew: true,
        },
      ];
    }

    return results;
  };

  // React.useEffect(() => {
  //   setContact(contactList[0]);
  // }, []);

  return (
    <Layout>
      <ControlPanel
        contactList={contactList}
        contact={contact}
        handleSetContact={handleSetContact}
        handleLookupContact={handleDirectLookupContact}
      />
      <Box>
        <Softphone
          contact={contact}
          autoRegister
          actions={{
            onFetchToken: handleFetchToken,
            onLookupContact: handleLookupContact,
          }}
        />
      </Box>
    </Layout>
  );
};

export default App;
