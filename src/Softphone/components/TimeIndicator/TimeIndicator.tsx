import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import Styles from "./Styles";
import { DefaultCallActions } from "@/Softphone/types/CallActions";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/Softphone/context";

interface TimeIndicatorProps {
  onClickLedIndicator?: DefaultCallActions["onClickLedIndicator"];
}

export const TimeIndicator = ({ onClickLedIndicator }: TimeIndicatorProps) => {
  const { ledIndicator } = useSoftphone();
  const { setLedIndicator } = useSoftphoneDispatch();
  const [time, setTime] = useState(0);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds]
      .map((val) => val.toString().padStart(2, "0"))
      .join(":");
  };

  const handleClickLedIndicator = async () => {
    if (onClickLedIndicator) {
      await onClickLedIndicator(Boolean(ledIndicator));
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((seconds) => seconds + 1);
    }, 1000);

    setLedIndicator(true);

    return () => {
      clearInterval(timerId);
      setLedIndicator(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      <IconButton onClick={handleClickLedIndicator} size="small">
        <Styles.LedIndicator stop={!ledIndicator} />
      </IconButton>
      <Box sx={{ minWidth: "80px", textAlign: "left" }}>{formatTime(time)}</Box>
    </Box>
  );
};
