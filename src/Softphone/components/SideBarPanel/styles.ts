import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { ContainerStyles } from "../Container/styles";

interface Props {
  styles?: ContainerStyles;
  isOpen: boolean;
}

const DEFAULT_STYLES = {
  widthClosed: "60px",
  widthOpen: "384px",
  height: "384px",
  minHeight: "480px",
};

export default {
  SideBarPanel: styled(Box)`
    position: absolute;
    border-right: 1px solid gray;
    right: 100%;
    z-index: 1;
  `,

  Container: styled(Box)<Props>`
    border-radius: 3px;
    width: ${({ isOpen }) =>
      isOpen ? DEFAULT_STYLES.widthOpen : DEFAULT_STYLES.widthClosed};
    height: ${({ styles }) => styles?.height || DEFAULT_STYLES.height};
    min-height: ${({ styles }) =>
      styles?.minHeight || DEFAULT_STYLES.minHeight};
    background-color: white;
    overflow: hidden;
    transition: width 0.3s ease-in-out;
  `,
};
