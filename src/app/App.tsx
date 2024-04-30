import { Softphone, ContactInput, useSoftphone } from "../Softphone";
import { Box, IconButton, styled } from "@mui/material";
import ControlPanel from "./ControlPanel";
import { useState } from "react";
import { isValidPhoneNumber } from "libphonenumber-js/min";
import { contactList } from "./contacts.mock";
import { MyMenu } from "./components/Menu/Menu";
import { Menu } from "./types";
import { Call } from "@twilio/voice-sdk";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import PhonePausedIcon from "@mui/icons-material/PhonePaused";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import GroupsIcon from "@mui/icons-material/Groups";
import VoicemailIcon from "@mui/icons-material/Voicemail";
import { useSideBar } from "@/Softphone/hooks/useSideBar";
import Info from "@mui/icons-material/Info";
import { CallAction, ContactStatus } from "@/Softphone/types";

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

  const { lookupContact, makeCall, updateCallAction } = useSoftphone();
  const { openSideBar } = useSideBar();

  const handleSetContact = (contact: ContactInput | undefined) => {
    if (!contact) {
      return setContact(undefined);
    }
    setContact(contact);
  };

  const handleDirectLookupContact = (
    contactToLookup: string | ContactInput
  ) => {
    if (typeof contactToLookup === "string") {
      return lookupContact({ identity: contactToLookup });
    } else {
      lookupContact(contactToLookup);
    }
  };

  const onFetchToken = async (identity: string) => {
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

  const handleChangeStatus = (status: ContactStatus) => {
    console.log({ status });
  };

  const handleClickHoldCallButton = (action: CallAction, call: Call) => {
    console.log("Hold Call", { call });
    updateCallAction("hold", { disabled: !action.disabled });
  };

  const handleClickTransferCallButton = (action: CallAction, call: Call) => {
    console.log("Transfer Call", { call });
    updateCallAction("transfer", { loading: !action.loading });

    setTimeout(() => {
      updateCallAction("transfer", { loading: false });
    }, 5000);
  };

  const handleIncomingCall = (call: Call) => {
    const contactFromCustomParams = call?.customParameters?.get("From");
    if (contactFromCustomParams) {
      return JSON.parse(contactFromCustomParams);
    }
  };

  const handleClickSideBarOption = (
    e: React.MouseEvent<HTMLButtonElement>,
    optionId: string
  ) => {
    e.preventDefault();
    openSideBar(optionId);
  };

  const handleExtendContactRender = (contact: ContactInput) => {
    const data = contact.data;
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { vendor, email, role } = data as any;
      return (
        <>
          {role && <div>{role}</div>}
          {email && <div>{email}</div>}
          {vendor?.name && <div>{vendor.name}</div>}
        </>
      );
    }
  };

  const handleCallMessageReceived = (message: string) => {
    console.log("Call message received", { message });
  };

  return (
    <Layout>
      <ControlPanel
        contactList={contactList}
        contact={contact}
        handleSetContact={handleSetContact}
        handleDirectLookupContact={handleDirectLookupContact}
      />
      <Box>
        <Softphone
          contact={contact || { identity: "" }}
          autoRegister
          handlers={{
            onLookupContact: handleLookupContact,
            onClickMakeCallButton: handleClickCallButton,
            onRenderContact: handleExtendContactRender,
          }}
          events={{
            onFetchToken,
            onChangeStatus: handleChangeStatus,
            onIncomingCall: handleIncomingCall,
            onCallMessageReceived: handleCallMessageReceived,
          }}
          callActions={[
            {
              id: "hold",
              label: "Hold",
              disabled: false,
              loading: false,
              icon: <PhonePausedIcon fontSize="large" />,
              onClick: (action, call: Call) =>
                handleClickHoldCallButton(action, call),
            },
            {
              id: "transfer",
              label: "Transfer",
              disabled: false,
              loading: false,
              icon: <PhoneForwardedIcon fontSize="large" />,
              onClick: (action, call: Call) =>
                handleClickTransferCallButton(action, call),
            },
          ]}
          sidebar={{
            options: [
              {
                id: "RECENT_CALLS",
                title: "Recent calls",
                component: (
                  <IconButton
                    onClick={(e) => handleClickSideBarOption(e, "RECENT_CALLS")}
                  >
                    <BackupTableIcon />
                  </IconButton>
                ),
                panelComponent: <div>Recent calls</div>,
              },
              {
                id: "CALLS_IN_HOLD",
                title: "Calls in hold",
                component: (
                  <IconButton
                    onClick={(e) =>
                      handleClickSideBarOption(e, "CALLS_IN_HOLD")
                    }
                  >
                    <PhonePausedIcon />
                  </IconButton>
                ),
                panelComponent: (
                  <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Iure provident soluta pariatur, ut delectus ad aliquid quos
                    unde possimus? Consequuntur odio dicta, sed corrupti quos
                    porro ipsum explicabo totam unde? Lorem ipsum, dolor sit
                    amet consectetur adipisicing elit. Vel cupiditate
                    exercitationem earum, blanditiis veniam ut nemo minima
                    laudantium corrupti ratione modi voluptate similique odit
                    tempora necessitatibus ipsa placeat dolorem non.
                  </div>
                ),
              },
              {
                id: "CALL_QUEUES",
                title: "Call groups",
                component: (
                  <IconButton
                    onClick={(e) => handleClickSideBarOption(e, "CALL_QUEUES")}
                  >
                    <GroupsIcon />
                  </IconButton>
                ),
                panelComponent: <div>Call groups</div>,
              },
              {
                id: "PENDING_VOICEMAILS",
                title: "Pending voicemails",
                component: (
                  <IconButton href="/pending-voicemail">
                    <VoicemailIcon />
                  </IconButton>
                ),
              },
              {
                id: "INFO",
                title: "Info",
                position: "bottom",
                component: (
                  <IconButton
                    color="primary"
                    onClick={(e) => handleClickSideBarOption(e, "INFO")}
                  >
                    <Info />
                  </IconButton>
                ),
              },
            ],
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
