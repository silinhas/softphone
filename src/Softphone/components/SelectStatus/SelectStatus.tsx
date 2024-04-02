import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSoftphone, useSoftphoneDispatch } from "../../context/context";
import { STATUS } from "../../context/constants";
import { Status } from "../../context/types";
import Styles from "./styles";
import { Box, Typography } from "@mui/material";

export const SelectStatus = () => {
  const { status } = useSoftphone();
  const { setStatus } = useSoftphoneDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as Status);
  };

  return (
    <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
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
  );
};
