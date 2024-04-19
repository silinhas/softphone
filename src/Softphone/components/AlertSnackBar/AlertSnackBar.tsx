import { Alert, Box, Collapse, IconButton } from "@mui/material";
import { useSoftphone } from "../../context/Softphone/context";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { log } from "../../utils";

interface AlertState {
  open: boolean;
  severity: "error" | "warning" | "info" | "success";
  message?: string;
}

export const AlertSnackBar = () => {
  const softphone = useSoftphone();

  const [alert, setAlert] = useState<AlertState>({
    open: false,
    severity: "info",
    message: "",
  });

  useEffect(() => {
    if (softphone.alert) {
      setAlert({
        open: true,
        severity: softphone.alert.type,
        message: softphone.alert.message,
      });
      if (softphone.alert.type === "error") {
        log("error", softphone.alert);
      }
    } else {
      setAlert({ open: false, severity: "info", message: "" });
    }
  }, [softphone.alert]);

  return (
    <Box position={"relative"} zIndex={1000}>
      <Collapse
        in={alert.open}
        sx={{ position: "absolute", bottom: "0", width: "100%" }}
      >
        <Alert
          elevation={3}
          sx={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
          severity={alert.severity}
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert({ ...alert, open: false });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alert.message}
        </Alert>
      </Collapse>
    </Box>
  );
};
