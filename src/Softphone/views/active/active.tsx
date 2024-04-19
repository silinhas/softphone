import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DialpadIcon from "@mui/icons-material/Dialpad";
import { ActionButton } from "@/Softphone/components";
import { useSoftphoneDispatch } from "@/Softphone/context/Softphone/context";
import { Stack } from "@/Softphone/layouts/Stack";

const ActiveView = () => {
  const { setView } = useSoftphoneDispatch();

  return (
    <Stack>
      <Stack.Segment
        flex={0.7}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LocalPhoneIcon sx={{ fontSize: "10rem" }} color="disabled" />
      </Stack.Segment>
      <Stack.Segment flex={0.3}>
        <ActionButton
          color="primary"
          onClick={() => setView("lookup")}
          icon={<DialpadIcon fontSize="large" />}
        />
      </Stack.Segment>
    </Stack>
  );
};
export default ActiveView;
