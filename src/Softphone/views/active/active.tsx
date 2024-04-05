import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DialpadIcon from "@mui/icons-material/Dialpad";
import { Box } from "@mui/material";
import { ActionButton } from "@/Softphone/components";

const ActiveView = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      height={"100%"}
    >
      <LocalPhoneIcon sx={{ fontSize: "10rem" }} color="disabled" />
      <ActionButton
        onClick={() => console.log("click")}
        icon={<DialpadIcon fontSize="large" />}
      />
    </Box>
  );
};
export default ActiveView;
