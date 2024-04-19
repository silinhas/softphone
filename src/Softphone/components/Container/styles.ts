import { Box } from "@mui/material";
import { styled } from "@mui/system";

export interface ContainerStyles {
  width?: string;
  height?: string;
  minHeight?: string;
}

interface Props {
  styles?: ContainerStyles;
}

const DEFAULT_STYLES = {
  width: "384px",
  height: "384px",
  minHeight: "480px",
};

export default {
  Container: styled(Box)<Props>`
    border-radius: 3px;
    width: ${({ styles }) => styles?.width || DEFAULT_STYLES.width};
    height: ${({ styles }) => styles?.height || DEFAULT_STYLES.height};
    min-height: ${({ styles }) =>
      styles?.minHeight || DEFAULT_STYLES.minHeight};
    background-color: white;
    position: relative;
    z-index: 1000;
  `,
};
