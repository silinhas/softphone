import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Container } from "./components/Container/Container";
import { ContainerStyles } from "./components/Container/styles";
import { useSoftphone, useSoftphoneDispatch } from "./context/context";
import { ActiveView, InactiveView } from "./views";
import { SelectStatus } from "./components";
import { Box } from "@mui/material";

interface Props {
  styles?: ContainerStyles;
}

const Softphone = ({ styles }: Props) => {
  const softphone = useSoftphone();
  const { setView } = useSoftphoneDispatch();

  return (
    <Container styles={styles}>
      <Box px={3} flex={" 0 1 auto"}>
        <SelectStatus />
      </Box>
      <Box flexGrow={1} alignContent={"center"} textAlign={"center"}>
        {softphone.view === "inactive" && <InactiveView />}
        {softphone.view === "active" && <ActiveView />}
      </Box>
      <Box flex={" 0 1 auto"}>
        <button onClick={() => setView("inactive")}>Inactive</button>
        <button onClick={() => setView("active")}>On Call</button>
      </Box>
    </Container>
  );
};

export default Softphone;
