import {
  Box,
  Divider,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";
import { type Menu } from "@/app/types";

const ITEM_HEIGHT = 48;

interface Props {
  open: boolean;
  title: string;
  handleClose: () => void;
  options: Menu["options"];
  onSelectItem: (option: { id: string; label: string; value: string }) => void;
}

export const MyMenu = ({
  open,
  title,
  handleClose,
  options,
  onSelectItem,
}: Props) => {
  const menuRef = useRef(null);

  const handleMakeCall = (option: {
    id: string;
    label: string;
    value: string;
  }) => {
    onSelectItem(option);
    handleClose();
  };

  return (
    <>
      <span ref={menuRef}></span>
      <MuiMenu
        anchorEl={menuRef.current}
        id="make-call-to-menu"
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              minWidth: "383px",
            },
          },
        }}
      >
        <Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant={"subtitle1"}>{title || "Options"}</Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon fontSize={"small"} />
          </IconButton>
        </Box>
        <Divider />
        {options.map((option) => {
          return (
            <MenuItem
              key={option.id}
              sx={{ display: "flex", justifyContent: "space-between" }}
              onClick={() => handleMakeCall(option)}
            >
              <Typography>{option.label}</Typography>
              <Typography>{option.value}</Typography>
            </MenuItem>
          );
        })}
      </MuiMenu>
    </>
  );
};
