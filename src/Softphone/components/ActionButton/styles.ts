import { IconButton as IconButtonMui } from "@mui/material";
import { Theme, styled } from "@mui/system";

const primaryColorStyles = (theme: Theme) => `
  color: ${theme.palette.common.black};
  background-color: ${theme.palette.common.white};
  &:hover {
    color: ${theme.palette.common.white};
    background-color: ${theme.palette.info.dark};
  }
`;

const successColorStyles = (theme: Theme) => `
  color: ${theme.palette.common.black};
  background-color: ${theme.palette.common.white};
  &:hover {
    color: ${theme.palette.common.white};
    background-color: ${theme.palette.success.main};
  }
`;

const errorColorStyles = (theme: Theme) => `
  color: ${theme.palette.common.black};
  background-color: ${theme.palette.common.white};
  &:hover {
    color: ${theme.palette.common.white};
    background-color: ${theme.palette.error.main};
  }
`;

export default {
  IconButton: styled(IconButtonMui)(
    ({ theme, color }) => `
    border: 1px solid;
    transition: color 0.2s, background-color 0.2s;

    ${color === "primary" && primaryColorStyles(theme)}
    ${color === "success" && successColorStyles(theme)}
    ${color === "error" && errorColorStyles(theme)}
  `
  ),
};
