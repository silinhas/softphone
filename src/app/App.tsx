import { Softphone, ContactInput, useSoftphone } from "../Softphone";
import { Box, styled } from "@mui/material";
import ControlPanel from "./ControlPanel";
import React from "react";
import { isValidPhoneNumber } from "libphonenumber-js/min";
import { contactList } from "./contacts.mock";

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
      contact.label?.toLowerCase()?.includes(contactToLookup.toLowerCase())
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

  const handleMakeCall = (contact: ContactInput) => {
    if (contact.type === "phone") {
      return {
        params: {
          FromTwilioPhone: "17727948352",
        },
      };
    }

    if (contact.type === "identifier") {
      // TODO: here some logic like get forwards to call
      return {
        type: "show-menu",
        options: [],
        params: {},
      };
    }

    return {
      type: "make-call",
    };
  };

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
            onMakeCall: handleMakeCall,
          }}
        />
      </Box>
    </Layout>
  );
};

export default App;
