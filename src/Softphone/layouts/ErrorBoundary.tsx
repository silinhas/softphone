import { Typography } from "@mui/material";
import { InactiveView } from "../views";
import Layout from "./Layout";
import { useSoftphone } from "../context/context";

interface Props {
  children: React.ReactNode;
}

export const ErrorBoundary = ({ children }: Props) => {
  const { error } = useSoftphone();

  if (error) {
    console.error({ error });

    return (
      <Layout>
        <Layout.View>
          <InactiveView />
          <Typography variant="h6" color="error">
            {error.message}
          </Typography>
        </Layout.View>
      </Layout>
    );
  }

  return <>{children}</>;
};
export default ErrorBoundary;
