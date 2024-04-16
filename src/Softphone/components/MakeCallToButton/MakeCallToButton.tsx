import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/context";
import { useState } from "react";
import { ActionButton } from "../ActionButton/ActionButton";
import { ContactListItem } from "../ContactListItem/ContactListItem";
import { Contact, ContactInput } from "@/Softphone/types";

const ITEM_HEIGHT = 48;

export const MakeCallToButton = () => {
  const { contactSelected, actions } = useSoftphone();
  const { makeCall } = useSoftphoneDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMakeCall = (contact: Contact) => {
    const action =
      actions.onMakeCall &&
      actions?.onMakeCall(contact?.toJSON() as ContactInput);
    makeCall(contactSelected, action?.params);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!contactSelected) return null;

  return (
    <>
      {!contactSelected?.optionsToCall?.length ? (
        <ActionButton
          active
          color="success"
          onClick={() => handleMakeCall(contactSelected)}
          aria-controls={open ? "make-call-to-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          icon={<PhoneIcon fontSize="large" />}
        />
      ) : (
        <>
          <ActionButton
            active
            color="success"
            onClick={handleOpenMenu}
            aria-controls={open ? "make-call-to-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            icon={<PhoneIcon fontSize="large" />}
          />
          <Menu
            id="make-call-to-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  minWidth: "383px",
                },
              },
            }}
          >
            <Box>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant={"subtitle1"}>Options</Typography>
              </Box>
              <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <CloseIcon fontSize={"small"} />
              </IconButton>
            </Box>
            <Divider />
            {contactSelected.optionsToCall.map((contactOption) => {
              const contact = Contact.buildContact(contactOption);
              return (
                <MenuItem
                  key={contact.id}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  onClick={() => handleMakeCall(contact)}
                >
                  <ContactListItem contact={contact} />
                </MenuItem>
              );
            })}
          </Menu>
        </>
      )}
    </>
  );
};
