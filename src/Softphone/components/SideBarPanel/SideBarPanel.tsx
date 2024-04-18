import { useState } from "react";
import Styles from "./styles";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { SideBarOption, SideBarProps } from "@/Softphone/types";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const SideBarPanel = ({ styles, options }: SideBarProps) => {
  const [open, setOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<SideBarOption>();

  const handleOpenSideBar = (
    e: React.MouseEvent<HTMLButtonElement>,
    option: SideBarOption
  ) => {
    e.preventDefault();
    setOpen(!open);
    setActivePanel(option);
  };

  const handleCloseSideBar = () => {
    setOpen(false);
    setActivePanel(undefined);
  };

  return (
    <Styles.SideBarPanel>
      <Styles.Container styles={styles} isOpen={open} boxShadow={3}>
        {open ? (
          <Box display={"flex"} flexDirection={"column"} m={2}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant={"h6"}>{activePanel?.title}</Typography>
              <IconButton
                aria-label={"toggle close"}
                onClick={handleCloseSideBar}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
            <Divider />
          </Box>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"start"}
            mx={1.5}
          >
            {options?.map((option, index) => (
              <IconButton
                key={index}
                onClick={(e) => handleOpenSideBar(e, option)}
              >
                {option.icon}
              </IconButton>
            ))}
          </Box>
        )}
      </Styles.Container>
    </Styles.SideBarPanel>
  );
};
