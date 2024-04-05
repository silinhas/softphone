import { IconButton } from "@mui/material";
import styled from "styled-components";

// transition: border-color 0.2s, background-color 0.2s;
// &:hover {
//   border-color: ${({ theme }) => theme.palette.primary.main};
//   background-color: ${({ theme }) => theme.palette.primary.light};
// }

export default {
  IconButton: styled(IconButton)`
    background-color: #234124;
    &:hover {
      border-color: ${(props) => props.theme.palette.primary.main};
      background-color: #234124;
    }
  `,
};
