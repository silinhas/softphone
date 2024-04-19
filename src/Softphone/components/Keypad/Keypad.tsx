import { useSoftphone } from "@/Softphone/context/Softphone/context";
import { Box, Grid, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Styles from "./styles";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

export const Keypad = () => {
  const { call } = useSoftphone();
  const [display, setDisplay] = useState("");

  const setDisplayValue = useCallback(
    (key: string) => {
      if (KEYS.includes(key)) {
        call?.sendDigits(key);
        setDisplay((prevDisplay) => [...prevDisplay, key].join(""));
      }
    },
    [call]
  );

  const handleClickKey = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: string
  ) => {
    event.preventDefault();
    setDisplayValue(key);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setDisplayValue(e.key);
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
      width={"50%"}
    >
      <Box display={"flex"} justifyContent={"center"}>
        <TextField
          value={display}
          variant={"standard"}
          inputProps={{ style: { textAlign: "center" } }}
          autoFocus
        />
      </Box>
      <Grid container justifyContent="center">
        {KEYS.map((key) => (
          <Grid item xs={4} key={`${key}-${display.length}`} mb={1}>
            <Styles.KeyPad
              isPressed={display[display.length - 1] === key}
              onClick={(e) => handleClickKey(e, key)}
            >
              {key}
            </Styles.KeyPad>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
