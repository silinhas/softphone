import { styled } from "@mui/system";

export default {
  StatusCircle: styled("div")`
    margin-top: 8px;
    margin-right: 7px;
    height: 8px;
    width: 8px;
    border-radius: 100px;
    background-color: ${(props) => props.color};
  `,
};
