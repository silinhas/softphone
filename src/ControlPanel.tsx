import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  identity: string;
  handleSetIdentity: (identity: string) => void;
  handleLookupContact: (contactToLookup: string) => void;
}

const ControlPanel = ({
  identity,
  handleSetIdentity,
  handleLookupContact,
}: Props) => {
  const [identityInput, setIdentityInput] = useState("");
  const [contactInput, setContactInput] = useState("");

  const handleClickSetIdentity = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!identity) {
      handleSetIdentity(identityInput);
    } else {
      setIdentityInput("");
      handleSetIdentity("");
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
      <Box display={"flex"} flexDirection={"column"}>
        <Typography variant="h4">Control Panel</Typography>

        {/* Identity */}
        <Box my={2} width={"100%"}>
          <TextField
            id="identity"
            fullWidth
            label="Set your identity"
            variant="outlined"
            disabled={identity !== ""}
            value={identityInput}
            onChange={(event) => setIdentityInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleClickSetIdentity(event);
              }
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color={identity ? "error" : "primary"}
            disabled={!identityInput}
            onClick={handleClickSetIdentity}
          >
            {identity ? "Remove Identity" : "Set Identity"}
          </Button>
        </Box>

        {/* Lookup Contact */}
        <TextField
          id="contact"
          fullWidth
          label="Set contact to lookup"
          variant="outlined"
          disabled={identity !== ""}
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
    </Paper>
  );
};

export default ControlPanel;
