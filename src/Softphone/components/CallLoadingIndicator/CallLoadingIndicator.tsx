import { Box } from "@mui/material";
import { styled, keyframes } from "@mui/system";

const growFast = keyframes`
  0% {
    transform: scale(0.5);
    // border-width: 5px; // commented as before
  }
  50% {
    transform: scale(1);
    // border-width: 2px; // commented as before
  }
  100% {
    transform: scale(0.5);
    // border-width: 5px; // commented as before
  }
`;

const growSlow = keyframes`
  0% {
    transform: scale(0.3);
    border-width: 3px;
  }
  50% {
    transform: scale(1);
    border-width: 5px;
  }
  100% {
    transform: scale(0.3);
    border-width: 3px;
  }
`;

const Styled = {
  ParentCircle: styled(Box)(() => ({
    animation: `${growFast} 2s linear infinite`,
  })),
  ChildCircle: styled(Box)(() => ({
    animation: `${growSlow} 3s linear infinite`,
  })),
  GrandChildCircle: styled(Box)(() => ({
    animation: `${growFast} 2.5s linear infinite`,
  })),
  Container: styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    paddingTop: "5px",
  })),
};

export const CallLoadingIndicator = () => {
  return (
    <Styled.Container>
      <Styled.ParentCircle
        component={"div"}
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "5px solid",
          borderColor: "primary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Styled.ChildCircle
          component={"div"}
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "3px solid",
            borderColor: "primary.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Styled.GrandChildCircle
            component={"div"}
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid",
              borderColor: "primary.main",
            }}
          />
        </Styled.ChildCircle>
      </Styled.ParentCircle>
    </Styled.Container>
  );
};
