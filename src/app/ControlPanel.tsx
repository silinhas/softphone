import { ContactInput } from "@/Softphone";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  contactList: ContactInput[];
  contact?: ContactInput;
  handleSetContact: (contact: ContactInput | undefined) => void;
  handleLookupContact: (contactToLookup: string) => void;
}

const ControlPanel = ({
  contact,
  handleSetContact,
  handleLookupContact,
  contactList,
}: Props) => {
  const [contactInput, setContactInput] = useState("");

  const handleSelectContact = (event: SelectChangeEvent<string | "">) => {
    event.preventDefault();

    const selectedContact = contactList.find(
      (contact) => contact.identity === event.target.value
    );
    if (selectedContact) {
      handleSetContact(selectedContact);
    }
  };

  const handleClickLookupContact = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    handleLookupContact(contactInput);
    setContactInput("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "300px",
        minHeight: "300px",
        bgcolor: "white",
        m: 10,
        py: 2,
        px: 5,
      }}
    >
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <Typography variant="h4">Control Panel</Typography>

        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select your contact
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={contact?.identity || ""}
              onChange={handleSelectContact}
              renderValue={(value) => {
                const selectedContact = contactList.find(
                  (contact) => contact.identity === value
                );
                return (
                  <Box display={"flex"}>
                    <Avatar
                      alt={selectedContact?.label}
                      sx={{ width: 24, height: 24, mr: 1 }}
                      src={selectedContact?.avatar || "/"}
                    />
                    <Typography variant={"subtitle1"}>
                      {selectedContact?.label}
                    </Typography>
                  </Box>
                );
              }}
            >
              {contactList.map((contact) => (
                <MenuItem key={contact.identity} value={contact.identity}>
                  <Avatar
                    alt={contact.label}
                    sx={{ width: 24, height: 24, mr: 1 }}
                    src={contact.avatar || "/"}
                  />
                  <Typography variant={"subtitle1"}>{contact.label}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color={"error"}
            disabled={!contact}
            onClick={() => handleSetContact(undefined)}
          >
            Remove Identity
          </Button>
        </Box>

        {/* Lookup Contact */}
        <Box>
          <TextField
            id="contact"
            fullWidth
            label="Set contact to lookup"
            variant="outlined"
            value={contactInput}
            onChange={(event) => setContactInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleClickLookupContact(event);
              }
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color={"primary"}
            disabled={!contactInput}
            onClick={handleClickLookupContact}
          >
            Set Contact
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ControlPanel;
