import { Paper } from "@mui/material";
import Styles, { ContainerStyles } from "./styles";

interface Props {
  children: React.ReactNode;
  styles?: ContainerStyles;
}

export const Container = ({ children, styles }: Props) => {
  return (
    <Paper elevation={3}>
      <Styles.Container
        styles={styles}
        display={"flex"}
        flexDirection={"column"}
      >
        {children}
      </Styles.Container>
    </Paper>
  );
};
