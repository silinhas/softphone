import { styled } from "@mui/system";

export default {
  LedIndicator: styled("div")`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: red;
    animation: blink 1.5s linear infinite;

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
  `,
};
