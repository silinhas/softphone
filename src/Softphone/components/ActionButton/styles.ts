import { IconButton as IconButtonMui } from "@mui/material";
import styled from "styled-components";

export default {
  IconButton: styled(IconButtonMui)`
    &&& {
      border: 1px solid;
      color: ${({ theme }) => theme.palette.common.black};
      transition: color 0.2s, background-color 0.2s;
      &:hover {
        color: ${({ theme }) => theme.palette.common.white};
        background-color: ${({ theme }) => theme.palette.info.dark};
      }
    }
  `,
};
