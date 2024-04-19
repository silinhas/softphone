import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Styles from "./styles";
import { Box, Typography } from "@mui/material";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/Softphone/context";
import { Status } from "@/Softphone/context/Softphone/types";
import { STATUS } from "@/Softphone/context/Softphone/constants";

export const SelectStatus = () => {
  const { status } = useSoftphone();
  const { setStatus } = useSoftphoneDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as Status);
  };

  return (
    <Box mx={4} pt={1.5}>
      <FormControl fullWidth size="small">
        <InputLabel id="softphone-status">Status</InputLabel>
        <Select
          labelId="softphone-status"
          id="softphone-status-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          {/* Display Status and color */}
          {STATUS.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              <Box display={"flex"} alignItems={"baseline"}>
                <Styles.StatusCircle color={status.color} />
                <Typography variant="caption" color="textSecondary">
                  {status.label}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
