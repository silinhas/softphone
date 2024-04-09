import { IconButton as IconButtonMui } from "@mui/material";
import styled, { DefaultTheme } from "styled-components";

// Función auxiliar para estilos de color "primary"
const primaryColorStyles = ({ theme }: { theme: DefaultTheme }) => `
  color: ${theme.palette.common.black};
  background-color: ${theme.palette.common.white};
  &:hover {
    color: ${theme.palette.common.white};
    background-color: ${theme.palette.info.dark};
  }
`;

// Función auxiliar para estilos de color "success"
const successColorStyles = ({ theme }: { theme: DefaultTheme }) => `
  color: ${theme.palette.common.black};
  background-color: ${theme.palette.common.white};
  &:hover {
    color: ${theme.palette.common.white};
    background-color: ${theme.palette.success.main};
  }
`;

// Aplica las funciones auxiliares condicionalmente

export default {
  IconButton: styled(IconButtonMui)`
    &&& {
      border: 1px solid;
      transition: color 0.2s, background-color 0.2s;

      ${({ color, theme }) =>
        color === "primary" && primaryColorStyles({ theme })}
      ${({ color, theme }) =>
        color === "success" && successColorStyles({ theme })}
    }
  `,
};
