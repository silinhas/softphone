import { IconButton } from "@mui/material";
import { styled } from "@mui/system";

interface KeypadProps {
  isPressed?: boolean;
}

export default {
  KeyPad: styled(IconButton, {
    shouldForwardProp: (prop) => prop !== "isPressed",
  })<KeypadProps>(
    ({ theme, isPressed }) => `
            border: 1px solid;
            height: 40px;
            width: 40px;
            ${
              isPressed &&
              `
                animation: keyPress 0.3s ease-in-out;
                animation-iteration-count: 1;

                @keyframes keyPress {
                    0% {
                        background-color: ${theme.palette.common.white};
                        color: ${theme.palette.common.black};
                    }
                    50% {
                        background-color: ${theme.palette.info.dark};
                        color: ${theme.palette.common.white};
                    }
                    100% {
                        background-color: ${theme.palette.common.white};
                        color: ${theme.palette.common.black};
                    }
                }
            `
            }

        `
  ),
};
