import { IconButton as IconButtonMui, IconButtonProps } from "@mui/material";
import { Theme, styled } from "@mui/system";

interface Props extends IconButtonProps {
  active: "true" | "false";
}

const createColorStyles = (
  theme: Theme,
  active: boolean,
  mainColor: string,
  hoverColor: string
) => `
  color: ${active ? theme.palette.common.white : theme.palette.common.black};
  background-color: ${active ? mainColor : theme.palette.common.white};
  &:hover {
    color: ${!active ? theme.palette.common.white : theme.palette.common.black};
    background-color: ${!active ? hoverColor : theme.palette.common.white};
  }
`;

export default {
  IconButton: styled(IconButtonMui)<Props>(
    ({ theme, color, active }) => `
    border: 1px solid;
    transition: color 0.2s, background-color 0.2s;

    ${
      color === "primary"
        ? createColorStyles(
            theme,
            JSON.parse(active),
            theme.palette.info.dark,
            theme.palette.info.dark
          )
        : color === "success"
        ? createColorStyles(
            theme,
            JSON.parse(active),
            theme.palette.success.main,
            theme.palette.success.main
          )
        : color === "error"
        ? createColorStyles(
            theme,
            JSON.parse(active),
            theme.palette.error.main,
            theme.palette.error.main
          )
        : ""
    }
  `
  ),
};
