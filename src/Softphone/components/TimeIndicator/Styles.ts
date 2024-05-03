import { styled } from "@mui/system";

interface LedIndicatorProps {
  stop?: boolean;
}

export default {
  LedIndicator: styled("div")<LedIndicatorProps>(
    ({ stop }) => `
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${stop ? "lightgray" : "red"};
      animation: ${stop ? "none" : "blink 1.5s linear infinite"};

      @keyframes blink {
        0% {
          opacity: 0.4;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0.4;
        }
      }
    `
  ),
};
