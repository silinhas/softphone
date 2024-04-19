import Styles from "./styles";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { SideBarProps } from "@/Softphone/types";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSideBar } from "../../context/SideBarPanel/context";
import { Fragment, useEffect } from "react";

export const SideBarPanel = ({ styles, options }: SideBarProps) => {
  const { open, activePanel, closeSideBar, updateOptions } = useSideBar();

  useEffect(() => {
    if (options) {
      updateOptions(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.length]);

  const topOptions = options?.filter((option) => option.position !== "bottom");
  const bottomOptions = options?.filter(
    (option) => option.position === "bottom"
  );

  return (
    <Styles.SideBarPanel>
      <Styles.Container styles={styles} isOpen={open} boxShadow={3}>
        {open ? (
          <Box display={"flex"} flexDirection={"column"} m={2}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant={"h6"}>{activePanel?.title}</Typography>
              <IconButton aria-label={"toggle close"} onClick={closeSideBar}>
                <ChevronRightIcon />
              </IconButton>
            </Box>
            <Divider />
            <Box>{activePanel?.panelComponent}</Box>
          </Box>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            height={"100%"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              m={1.5}
            >
              {topOptions?.map((option) => (
                <Fragment key={option.id}>{option.component}</Fragment>
              ))}
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              m={1.5}
            >
              {bottomOptions?.map((option) => (
                <Fragment key={option.id}>{option.component}</Fragment>
              ))}
            </Box>
          </Box>
        )}
      </Styles.Container>
    </Styles.SideBarPanel>
  );
};
