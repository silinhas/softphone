import { Box, BoxProps } from "@mui/material";

export const Stack = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display={"flex"} flexDirection={"column"} height={"100%"}>
      {children}
    </Box>
  );
};

interface StackSegmentProps extends BoxProps {
  children: React.ReactNode;
  flex: number;
}

Stack.Segment = ({ children, flex, ...boxProps }: StackSegmentProps) => {
  return (
    <Box flex={flex} {...boxProps}>
      {children}
    </Box>
  );
};
