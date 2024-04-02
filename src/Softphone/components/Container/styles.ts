import { Box } from "@mui/material";
import styled from "styled-components";

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
    width: ${({ styles }) => styles?.width || DEFAULT_STYLES.width};
    height: ${({ styles }) => styles?.height || DEFAULT_STYLES.height};
    min-height: ${({ styles }) =>
      styles?.minHeight || DEFAULT_STYLES.minHeight};
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  `,
};
