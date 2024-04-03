import { Typography } from "@mui/material";
import Layout from "./Layout";
import { useSoftphone } from "../context/context";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import { log } from "../utils";

interface Props {
  children: React.ReactNode;
}

export const ErrorBoundary = ({ children }: Props) => {
  const { alert } = useSoftphone();

  if (alert?.type === "error" && alert?.severity === "critical") {
    log("error", alert);
    return (
      <Layout.View>
        <PhoneDisabledIcon sx={{ fontSize: "10rem" }} color="disabled" />
        <Typography variant="h6" color="gray">
          Unable to initialize the Softphone
        </Typography>
      </Layout.View>
    );
  }

  return <>{children}</>;
};
export default ErrorBoundary;
