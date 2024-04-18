import { Softphone, ContactInput, useSoftphone } from "../Softphone";
import { Box, styled } from "@mui/material";
import ControlPanel from "./ControlPanel";
import { useState } from "react";
import { isValidPhoneNumber } from "libphonenumber-js/min";
import { contactList } from "./contacts.mock";
import { MyMenu } from "./components/Menu/Menu";
import { Menu } from "./types";
import { Call } from "@twilio/voice-sdk";

const Layout = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  justify-content: space-evenly;
`;

const App = () => {
  const [contact, setContact] = useState<ContactInput>();
  const [menu, setMenu] = useState<Menu>({
    type: undefined,
    open: false,
    title: "",
    options: [],
  });

  const { destroyDevice, lookupContact, makeCall } = useSoftphone();

  const handleSetContact = (contact: ContactInput | undefined) => {
    if (!contact) {
      destroyDevice();
    }
    setContact(contact);
  };

  const handleDirectLookupContact = (contactToLookup: string) => {
    lookupContact({ identity: contactToLookup });
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

  const handleClickCallButton = (contactSelected: ContactInput) => {
    if (contactSelected.type === "phone" && contact?.data?.vendor) {
      const vendor = contact.data.vendor as {
        id: string;
        name: string;
        phone: string;
      };
      setMenu({
        type: "phone",
        open: true,
        title: "Call from",
        options: [
          {
            id: vendor.id,
            label: vendor.name,
            value: vendor.phone,
          } as never,
        ],
      });
      return;
    }

    if (
      contactSelected.type === "identifier" &&
      contactSelected.data?.forwards
    ) {
      const forwards = contactSelected.data.forwards as unknown[];

      const forwardMenu: Menu = {
        type: "identifier",
        open: true,
        title: "Call to Forward",
        options: forwards.map((forward) => ({
          id: (forward as ContactInput).id!,
          label: (forward as ContactInput).label!,
          value: (forward as ContactInput).identity!,
        })),
      };
      forwardMenu.options.unshift({
        id: contactSelected.id!,
        label: contactSelected.label!,
        value: contactSelected.identity!,
      } as never);
      setMenu(forwardMenu);
      return;
    }

    makeCall({ contact: contactSelected });
  };

  const handleMakeCallFromMenu = (option: {
    id: string;
    label: string;
    value: string;
  }) => {
    if (menu.type === "phone") {
      makeCall({
        params: {
          FromTwilioPhone: option.value,
        },
      });
      return;
    }

    if (menu.type === "identifier") {
      const forwardContact = contactList.find(
        (contact) => contact.id === option.id
      );

      makeCall({
        contact: forwardContact,
      });
      return;
    }
  };

  const handleChangeStatus = (status: "available" | "do-not-disturb") => {
    console.log({ status });
  };

  const handleClickHoldCallButton = (call: Call) => {
    console.log("Hold Call", { call });
  };

  const handleClickTransferCallButton = (call: Call) => {
    console.log("Transfer Call", { call });
  };

  const handleIncomingCall = (call: Call) => {
    const contactFromCustomParams = call?.customParameters?.get("From");
    return JSON.parse(contactFromCustomParams || "");
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
            onChangeStatus: handleChangeStatus,
            onLookupContact: handleLookupContact,
            onClickMakeCallButton: handleClickCallButton,
            onClickHoldCallButton: handleClickHoldCallButton,
            onClickTransferCallButton: handleClickTransferCallButton,
            onIncomingCall: handleIncomingCall,
          }}
        />
        <MyMenu
          open={menu.open}
          title={menu.title}
          handleClose={() => setMenu({ open: false, options: [], title: "" })}
          onSelectItem={handleMakeCallFromMenu}
          options={menu.options}
        />
      </Box>
    </Layout>
  );
};

export default App;
