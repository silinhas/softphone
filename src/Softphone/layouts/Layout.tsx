import { Box } from "@mui/material";
import { Container } from "../components";
import { ContainerStyles } from "../components/Container/styles";

interface LayoutProps {
  children: React.ReactNode;
  styles?: ContainerStyles;
}

export const Layout = ({ children, styles }: LayoutProps) => {
  return <Container styles={styles}>{children}</Container>;
};

Layout.Top = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box px={3} flex={" 0 1 auto"}>
      {children}
    </Box>
  );
};

Layout.View = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box flexGrow={1} alignContent={"center"} textAlign={"center"}>
      {children}
    </Box>
  );
};

Layout.Bottom = ({ children }: { children: React.ReactNode }) => {
  return <Box flex={" 0 1 auto"}>{children}</Box>;
};

export default Layout;
