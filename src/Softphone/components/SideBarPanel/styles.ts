import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { ContainerStyles } from "../Container/styles";

interface Props {
  styles?: ContainerStyles;
  isOpen: boolean;
}

const DEFAULT_STYLES = {
  width: "384px",
  widthClosed: "60px",
  widthOpen: "384px",
  height: "384px",
  minHeight: "480px",
};

export default {
  SideBarPanel: styled(Box)`
    position: absolute;
    right: 100%;
  `,

  Container: styled(Box, {
    shouldForwardProp: (prop) => prop !== "isOpen",
  })<Props>`
    border-right: 1px solid #0000001f;
    width: ${({ isOpen }) =>
      isOpen ? DEFAULT_STYLES.widthOpen : DEFAULT_STYLES.widthClosed};
    height: ${({ styles }) => styles?.height || DEFAULT_STYLES.height};
    min-height: ${({ styles }) =>
      styles?.minHeight || DEFAULT_STYLES.minHeight};

    background-color: white;
    overflow: hidden;
    transition: width 0.2s ease-in-out;
  `,
};
