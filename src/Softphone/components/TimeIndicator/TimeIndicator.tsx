import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Styles from "./Styles";

export const TimeIndicator = () => {
  const [time, setTime] = useState(0);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds]
      .map((val) => val.toString().padStart(2, "0"))
      .join(":");
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((seconds) => seconds + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      <Styles.LedIndicator />
      <Box>{formatTime(time)}</Box>
    </Box>
  );
};
