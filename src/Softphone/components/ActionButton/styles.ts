import { IconButton as IconButtonMui, IconButtonProps } from "@mui/material";
import { Theme, styled } from "@mui/system";

interface Props extends IconButtonProps {
  active: "true" | "false";
  loading: "true" | "false";
}

const createColorStyles = (
  theme: Theme,
  active: boolean,
  loading: boolean,
  mainColor: string,
  hoverColor: string
) => `
  color: ${active ? theme.palette.common.white : theme.palette.common.black};
  background-color: ${active ? mainColor : theme.palette.common.white};
  &:hover {
    color: ${!active ? theme.palette.common.white : theme.palette.common.black};
    background-color: ${!active ? hoverColor : theme.palette.common.white};
  }

  ${
    loading
      ? `
      @keyframes spinnerAnimation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      &:after {
        content: "";
        position: absolute;
        width: 36px;
        height: 36px;
        border: 6px solid ${theme.palette.common.white};
        border-top-color: ${mainColor};
        border-radius: 50%;
        animation: spinnerAnimation 800ms linear infinite;
        background-color: transparent;
      }
     `
      : ""
  }
`;

export default {
  IconButton: styled(IconButtonMui)<Props>(
    ({ theme, color, active, loading }) => `
    border: 1px solid;
    transition: color 0.2s, background-color 0.2s;

    ${
      color === "primary"
        ? createColorStyles(
            theme,
            JSON.parse(active),
            JSON.parse(loading),
            theme.palette.info.dark,
            theme.palette.info.dark
          )
        : color === "success"
        ? createColorStyles(
            theme,
            JSON.parse(active),
            JSON.parse(loading),
            theme.palette.success.main,
            theme.palette.success.main
          )
        : color === "error"
        ? createColorStyles(
            theme,
            JSON.parse(active),
            JSON.parse(loading),
            theme.palette.error.main,
            theme.palette.error.main
          )
        : ""
    }
  `
  ),
};
