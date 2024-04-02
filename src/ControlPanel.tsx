import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  identity: string;
  handleSetIdentity: (identity: string) => void;
}

const ControlPanel = ({ identity, handleSetIdentity }: Props) => {
  const [identityInput, setIdentityInput] = useState("");

  const handleClickSetIdentity = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!identity) {
      handleSetIdentity(identityInput);
    } else {
      setIdentityInput("");
      handleSetIdentity("");
    }
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
        <TextField
          id="identity"
          label="Set your identity"
          variant="outlined"
          disabled={identity !== ""}
          value={identityInput}
          onChange={(event) => setIdentityInput(event.target.value)}
        />
        <Button
          variant="contained"
          color={identity ? "error" : "primary"}
          disabled={!identityInput}
          onClick={handleClickSetIdentity}
        >
          {identity ? "Remove Identity" : "Set Identity"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ControlPanel;
